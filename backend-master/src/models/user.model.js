import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phno: {
        unique: true,
        required: true,
        type: String
    },
    isActive: { // check if user's email is verified
        type: Boolean,
        default: false
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    image: {
        type: String
        // default: 'https://example.com/default-profile-image.jpg' // Default image URL
    },
    addresses: [
      {
        street: String,
        city: String,
        postalCode: String,
        country: String
      }
    ],
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        phno: this.phno,
        name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)