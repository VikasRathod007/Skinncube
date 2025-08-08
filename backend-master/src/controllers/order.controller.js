import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'abc',
    key_secret: 'abc',
});

const orderInitiate = asyncHandler(async(req,res)=> {
    try {
        console.log("Here");
        
        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit (paise for INR)
            currency: "INR",
            receipt: "order_rcptid_11",
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

export {
    orderInitiate
}