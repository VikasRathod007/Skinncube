import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const labelSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

labelSchema.pre("save", function(next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export const Label = mongoose.model("Label", labelSchema);