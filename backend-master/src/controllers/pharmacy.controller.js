import { asyncHandler } from "../utils/asyncHandler.js";
import { Pharmacy } from "../models/pharmacy.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessandRefreshToken = async(pharmacyId) => {
    try {
        const pharmacy = await Pharmacy.findById(pharmacyId)
        const accessToken = pharmacy.generateAccessToken()
        const refreshToken = pharmacy.generateRefreshToken()

        pharmacy.refreshToken = refreshToken
        // save without giving required fields
        await pharmacy.save({validateBeforeSave: false})
        console.log(pharmacy);
        
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating refreshing and access token")
    }
}

const registerUser = asyncHandler( async (req,res) => {
    const {ownerName ,shopName, licenceNumber, address , email, phno, password } = req.body

    if (
        [ownerName ,shopName, licenceNumber, email, phno, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (typeof address !== 'object' || !address.street || !address.city || !address.state || !address.zipCode) {
        throw new ApiError(400, "Address must include street, city, state, and zip code");
    }

    const existedUser = await Pharmacy.findOne({
        $or: [{ phno }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or phno already exists")
    }

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path
    }
    console.log(imageLocalPath)

    // const image = await uploadOnCloudinary(imageLocalPath)

    // throw new ApiError(400,"check till here")
    const user = await Pharmacy.create({
        ownerName,
        shopName,
        licenceNumber,
        address,
        image: imageLocalPath || process.env.DEFAULT_IMAGE_PATH,
        email,
        password,
        phno
    })

    const createdUser = await Pharmacy.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
} )

const loginUser = asyncHandler( async (req,res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new ApiError(400, "email/password missing")
    }
    // User is used for mongodb, user is for handling our custom defined class and its function
    const user = await Pharmacy.findOne({email})

    if(!user) {
        throw new ApiError(400, "User does not exist with the email")
    }

    const ispassvalid = await user.isPasswordCorrect(password);

    if(!ispassvalid){
        throw new ApiError(400, "Invalid Password")
    }
    console.log(user)
    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedUser = await Pharmacy.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: loggedUser, accessToken, refreshToken
        }, "User logged in successfully")
    )
})

const logoutUser = asyncHandler( async (req,res) => {
    await Pharmacy.findByIdAndUpdate(req.user._id,{
        $set: {
            refreshToken: null
        }
    },{
        new: true
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
    .json(new ApiError(200,{},"User Logged Out"))
})

const refreshAccessToken =asyncHandler( async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized access")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await Pharmacy.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401,"Invalid refresh Token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessandRefreshToken(user._id)
    
        return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newrefreshToken).json(
            new ApiResponse(200,{accessToken, refreshToken: newrefreshToken},"Access token refreshed")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}