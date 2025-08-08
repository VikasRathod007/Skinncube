import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const pharmacySchema = new Schema({
    shopName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    ownerName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    licenceNumber: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
        // default: 'https://example.com/default-profile-image.jpg' // Default image URL
    },
    address: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zipCode: {
          type: String,
          required: true,
        },
    },
    phno: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    refreshToken: {
        type: String
    }
},{timestamps: true})

pharmacySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

pharmacySchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

pharmacySchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        phno: this.phno,
        shopName: this.shopName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
pharmacySchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema)