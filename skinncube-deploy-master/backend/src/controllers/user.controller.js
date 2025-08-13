import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import sgMail from '@sendgrid/mail';
import { getVerifyEmailTemplate } from "../utils/emailTemplates.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        // save without giving required fields
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating refreshing and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // console.log(req.body);

    const { name, email, phno, password } = req.body
    //console.log("email: ", email);    

    if (
        [name, email, phno, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ phno }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or phno already exists")
    }
    //console.log(req.files);

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path
    }
    console.log(imageLocalPath)

    // const image = await uploadOnCloudinary(imageLocalPath)

    // throw new ApiError(400,"check till here")
    const user = await User.create({
        name,
        image: imageLocalPath || process.env.DEFAULT_IMAGE_PATH,
        email,
        password,
        phno
    })
    const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.EMAIL_VERIFICATION_SECRET,
        { expiresIn: "24h" } // Token valid for 24 hours
    );
    const verificationUrl = `${process.env.BASE_URL}/users/verifyemail/${verificationToken}`;
    const emailTemplate = getVerifyEmailTemplate(verificationUrl);
    const msg = {
        to: email, // recipient
        from: 'no-reply@skinncube.com',
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
    };
    try {
        // console.log(sgMail);
        // console.log(msg);

        await sgMail.send(msg);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            message: "Error sending verification email, please try again later."
        });
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully!! Please check your mail to verify yourself")
    )
})



const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "email/password missing")
    }
    // User is used for mongodb, user is for handling our custom defined class and its function
    const user = await User.findOne({ email })

    if (!user) {
        const error = new ApiError(400, "User does not exists with the provided email")
        return res.status(error.statusCode).json(error.formatResponse());
    }

    const ispassvalid = await user.isPasswordCorrect(password);

    if (!ispassvalid) {
        // throw new ApiError(400, "Invalid Password")
        const error = new ApiError(400, "Invalid Password")
        return res.status(error.statusCode).json(error.formatResponse());
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedUser, accessToken, refreshToken
            }, "User logged in successfully")
        )
})

const checkAuth = asyncHandler(async (req, res) => {
    if (req.user) {
        const user = req.user;
        return res.status(200).json({
            success: true,
            message: "Authenticated user!",
            user,
        });
    } else {
        const error = new ApiError(400, "User not authenticated")
        return res.status(error.statusCode).json(error.formatResponse());
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: null
        }
    }, {
        new: true
    })

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Different sameSite for dev/prod
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized access")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessandRefreshToken(user._id)

        return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newrefreshToken).json(
            new ApiResponse(200, { accessToken, refreshToken: newrefreshToken }, "Access token refreshed")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getAllUser = asyncHandler(async (_, res) => {
    const users = await User.find()
    if (users.length === 0) {
        throw new ApiError(400, "No User found")
    }
    return res.status(201).json(
        new ApiResponse(200, users, "User retrieved Successfully")
    )
})

const addAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming req.user is populated by middleware
    console.log(req.body);
    const { street, city, postalCode, country } = req.body;

    // Validate input
    if ([street, city, postalCode, country].some((field) => !field?.trim())) {
        throw new ApiError(400, "All address fields are required");
    }

    try {
        // Find user and update their addresses
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Add the new address to the addresses array
        user.addresses.push({ street, city, postalCode, country });
        await user.save();

        return res.status(200).json(
            new ApiResponse(200, user.addresses, "Address added successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to add address");
    }
});

const changeUserRoleToSuperAdmin = asyncHandler(async (req, res) => {
    const userId = req.query.userId; // User ID from the URL params

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Ensure the user is not already a superadmin
    if (user.role === 'superadmin') {
        throw new ApiError(400, "User is already a superadmin");
    }

    // Change the role to superadmin
    user.role = 'superadmin';
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "User role updated to superadmin")
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!token) {
        throw new ApiError(400, "Verification token is missing");
    }
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.isActive) {
            throw new ApiError(400, "User email is already verified");
        }

        // Mark the user's email as verified
        user.isActive = true;
        await user.save();

        res.redirect(`${process.env.FRONT_END}/signin?message=Email%20verified%20successfully`);

    } catch (err) {
        throw new ApiError(400, "Invalid or expired token");
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAllUser,
    checkAuth,
    addAddress,
    changeUserRoleToSuperAdmin,
    verifyEmail
}