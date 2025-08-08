import mongoose, {Schema} from "mongoose";

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: String,
        // default: 'https://example.com/default-medicine-image.jpg'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    prescriptionRequired: {
        type: Boolean,
        default: false
    },
    labels: [
        {
            type: Schema.Types.ObjectId,
            ref: "Label"
        }
    ]
}, {timestamps: true})

export const Medicine = mongoose.model("Medicine", medicineSchema);