import mongoose, {Schema} from "mongoose";
import slugify from "slugify";

const subCategory = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        index: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
        // default: 'https://example.com/default-subcategory-image.jpg' // Default image URL
    },
    slug: {
        type: String,
        unique: true
    }
},{timestamps: true})

subCategory.pre("save", function(next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export const SubCategory = mongoose.model("SubCategory", subCategory)