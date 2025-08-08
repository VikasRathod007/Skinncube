import crypto from "crypto";
import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { Medicine } from "../models/medicine.model.js";
import { Cart } from "../models/cart.model.js";
import { clearCart } from "./cart.controller.js";
import { User } from "../models/user.model.js";
import { Pharmacy } from "../models/pharmacy.model.js";

// Replace these with your credentials
const PHONEPE_BASE_URL = process.env.PHONEPE_PAYMENT_LINK_PROD
const MERCHANT_ID = process.env.PHONEPE_PAYMENT_MERCHANT_ID_PROD
const PHONEPE_SALT_KEY = process.env.PHONEPE_KEY_PROD
const MUID = "MUID"+Date.now();

const orderInitiate = asyncHandler(async(req,res)=> {
    try {
        const addressId = req.body.addressId;
        console.log(addressId);
        
        const userId = req.user._id;
        const user = await User.findById(userId);
        const selectedAddress = user.addresses.id(addressId);
        if (!selectedAddress) {
            throw new ApiError(400, "Address not found");
        }

        const merchantTransactionId = req.body.transactionId;
        const amount = req.body.totalAmt
        const data = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: MUID,
            name: req.user.name,
            amount: amount * 100,
            redirectUrl: `${process.env.BASE_URL}/order/status/${merchantTransactionId}?userId=${userId}&addressId=${addressId}`,
            redirectMode: 'POST',
            mobileNumber: req.user.phno,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const keyIndex = 1;
        const checksumInput = `${payloadMain}/pg/v1/pay${PHONEPE_SALT_KEY}`;
        const sha256 = crypto.createHash("sha256").update(checksumInput).digest("hex");
        const checksum = `${sha256}###${keyIndex}`;

        const prod_URL = PHONEPE_BASE_URL+"pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
            return res.status(200).json(
                new ApiResponse(200,{paymentUrl: response.data.data.instrumentResponse.redirectInfo.url},"Payment URL Sent")
            )
        })
        .catch(function (error) {
            console.error(error);
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
});

const checkStatus = asyncHandler(async(req, res) => {
    // inputs variables
    const merchantTransactionId = req.body.transactionId
    const merchantId = req.body.merchantId
    
    const userId = req.query.userId;
    const addressId = req.query.addressId;

    // phonepe variables
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `${PHONEPE_BASE_URL}status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    axios.request(options).then(async(response) => {
        if (response.data.code === 'PAYMENT_SUCCESS') {
            const cart = await Cart.findOne({ user: userId });
            if (!cart || cart.items.length === 0) {
                throw new ApiError(400, "Cart is empty or not found");
            }
            const user = await User.findById(userId);
            const selectedAddress = user.addresses.id(addressId);
            if (!selectedAddress) {
            throw new ApiError(400, "Address not found");
            }

            const order = new Order({
                user: userId,
                items: cart.items,
                totalPrice: cart.totalPrice,
                status: "Payment Pending",
                shippingAddress: {
                    address: selectedAddress.street,
                    city: selectedAddress.city,
                    postalCode: selectedAddress.postalCode,
                    country: selectedAddress.country,
                },
                transactionId: "No-Transaction-Yet",
            });

            const savedOrder = await order.save();

            console.log("Payment Successfull");
            
            await updateOrderStatus(savedOrder._id, 'Payment Completed', merchantTransactionId);  // Update order status to "Processing"
            await clearcart_paymentsuccess(savedOrder._id);
            const url = `${process.env.FRONT_END}/user-profile?section=Orders`
            return res.redirect(url)
        } else {
            console.log("Payment Failure");
            const url = `${process.env.FRONT_END}/paymentgateway`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
});

const updateOrderStatus = asyncHandler( async (orderId, status, merchantTransactionId) => {
    try {
        // Find the order by its ID
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        // Update order status
        order.status = status;
        order.transactionId = merchantTransactionId;
        await order.save();

        // Decrease medicine quantities
        for (const item of order.items) {
            const medicine = await Medicine.findById(item.medicine);
            if (!medicine) {
                throw new Error(`Medicine with ID ${item.medicine} not found`);
            }

            // Check if enough stock is available
            if (medicine.quantity < item.quantity) {
                throw new Error(`Not enough stock for ${medicine.name}`);
            }

            // Decrease the quantity
            medicine.quantity -= item.quantity;
            await medicine.save();
        }
    } catch (error) {
        throw new ApiError(500,"Failed to update order status and medicine quantities: " + error.message);
    }
});

const updateOrdersAddPharmacy = asyncHandler(async (req, res) => {
    const pharmacies = req.body;

    try {
        if (!Array.isArray(pharmacies) || pharmacies.length === 0) {
            throw new ApiError(400, "Invalid or empty payload");
        }

        for (const { orderId, pharmacyId } of pharmacies) {
            // Find the order by its ID
            const order = await Order.findById(orderId);
            if (!order) {
                throw new ApiError(404, `Order with ID ${orderId} not found`);
            }

            // Find the pharmacy by its ID
            const pharmacy = await Pharmacy.findById(pharmacyId);
            if (!pharmacy) {
                throw new ApiError(404, `Pharmacy with ID ${pharmacyId} not found`);
            }

            // Update the pharmacy field in the order
            order.pharmacy = pharmacyId;
            await order.save();
        }

        res.status(200).json(new ApiResponse(200, null, "Pharmacies successfully added to orders!"));
    } catch (error) {
        throw new ApiError(500, "Failed to update orders with pharmacies", error.message);
    }
});

const deleteOrder = asyncHandler( async (orderId, merchantTransactionId) => {
    try {
        // Find the order by its ID
        const order = await Order.findByIdAndDelete(orderId);
        console.log("Deleting order id, since transaction failed");
        
        if (!order) {
            throw new Error("Order not found");
        }

    } catch (error) {
        throw new ApiError(500,"Failed to update order status and medicine quantities: " + error.message);
    }
});

const clearcart_paymentsuccess = asyncHandler ( async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        const userId = order.user;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new ApiError(404, "Cart Not Found");
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
    } catch (error) {
        throw new ApiError(500, "Failed to clear cart", error.message);
    }
});

const getOrders = asyncHandler(async(req, res) => {
    // inputs variables
    try {
        const userId = req.user._id;
        let orders;
        const user = req.user
        console.log(user);
        
        if(user.role==='superadmin'){
            orders = await Order.find().populate({
                path: "items.medicine",
                select: "name price description",
              }).populate({
                path: "pharmacy",
                select: "shopName ownerName address", // Add the fields you want from the Pharmacy schema
            }).sort({ createdAt: -1 });
        }
        else{
            orders = await Order.find({ user: userId }).populate({
                path: "items.medicine",
                select: "name price description",
              }).sort({ createdAt: -1 });
        }
        if (!orders || orders.length === 0) {
            throw new ApiError(404, "No orders found for this user");
        }
    
        res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch item from orders", error.message);
    }

});

export {
    orderInitiate,
    checkStatus,
    getOrders,
    updateOrdersAddPharmacy
}