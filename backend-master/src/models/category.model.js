import mongoose, {Schema} from "mongoose";
import slugify from "slugify";

const category = new Schema({
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
        // default: 'https://example.com/default-category-image.jpg' // Default image URL
    },
    sub_cat: [
        {
            type: Schema.Types.ObjectId,
            ref: "SubCategory"
        }
    ],
    slug: {
        type: String,
        unique: true
    }
},{timestamps: true})

category.pre("save", function(next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export const Category = mongoose.model("Category", category)