import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
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

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);