import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
});

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Payment Pending", "Payment Completed" ,"Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        transactionId: { // Add transactionId field
            type: String,
            required: true,
        },
        pharmacy: {
            type: Schema.Types.ObjectId,
            ref: "Pharmacy",
        }
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);