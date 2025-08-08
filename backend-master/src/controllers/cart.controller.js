import { Cart } from "../models/cart.model.js";
import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get Cart for a User
const getCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.medicine");

        if (!cart) {
            throw new ApiError(404,"Cart Not Found for the user");
        }
        res.status(200).json(
            new ApiResponse(200, cart, "Cart Data Sent")
        )
    } catch (error) {
        throw new ApiError(404,"Failed to retrieve cart", error.message);
    }
});

// Add Item to Cart
const addOrUpdateCartItem = asyncHandler(async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user._id;
        console.log(userId);
        console.log(req.body);
        
        const { medicineId, quantity } = req.body;
        
        console.log(medicineId, quantity);
        const medicine = await Medicine.findById(medicineId);
        console.log(medicine);
        
        if (!medicine) {
            throw new ApiError(404, "Medicine Not Found");
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.medicine.toString() === medicineId);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price = medicine.price * existingItem.quantity;
        } else {
            cart.items.push({
                medicine: medicineId,
                quantity,
                price: medicine.price * quantity,
            });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();
        res.status(200).json(new ApiResponse(200, cart, existingItem ? "Cart updated" : "Item added to cart"));
    } catch (error) {
        throw new ApiError(500, "Failed to add or update item in cart", error.message);
    }
});

// Update the quantity of items
const updateItemQuantity = asyncHandler(async (req, res) => {
    try {
        const { medicineId, action } = req.body; // `action` is 'increase' or 'decrease'
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new ApiError(404, "Cart not found for the user");
        }

        const item = cart.items.find((item) => item.medicine.toString() === medicineId);
        if (!item) {
            throw new ApiError(404, "Item not found in the cart");
        }

        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease") {
            item.quantity = Math.max(1, item.quantity - 1); // Ensure quantity does not go below 1
        } else {
            throw new ApiError(400, "Invalid action specified");
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json(
            new ApiResponse(200, cart, "Item quantity updated successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to update item quantity", error.message);
    }
});

// Remove Item from Cart
const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { medicineId } = req.params;
        console.log(medicineId);
        
        const cart = await Cart.findOne({ user: userId }).populate("items.medicine");
        if (!cart) {
            throw new ApiError(404, "Cart Not Found");
        }
        cart.items.forEach(item => {
            console.log("item.medicine: ", item._id.toString());  // Check the type and value of item.medicine
        });

        cart.items = cart.items.filter(item => item._id.toString() !== medicineId);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();
        res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
    } catch (error) {
        throw new ApiError(500, "Failed to remove item from cart", error.message);
    }
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new ApiError(404, "Cart Not Found");
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        res.status(200).json(new ApiResponse(200, null, "Cart cleared successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to clear cart", error.message);
    }
});

export { getCart, addOrUpdateCartItem, removeFromCart, clearCart, updateItemQuantity };