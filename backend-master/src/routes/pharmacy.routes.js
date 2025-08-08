import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/pharmacy.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWTPharmacy } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(upload.fields(
    [
        {
            name: "image",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWTPharmacy, logoutUser)
router.route("/refresh-token").get(refreshAccessToken)


export default router