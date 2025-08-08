import { Router } from "express";
import { checkAuth, getAllUser, loginUser, logoutUser, refreshAccessToken, registerUser, addAddress, changeUserRoleToSuperAdmin, verifyEmail } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isSA, verifyJWT } from "../middlewares/auth.middleware.js";

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
router.route("/verifyemail/:token").get(verifyEmail)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").get(refreshAccessToken)
router.route("/getalluser").get(verifyJWT,isSA,getAllUser)
router.route("/checkAuth").get(verifyJWT, checkAuth)
router.route("/addAdrress").post(verifyJWT, addAddress)
router.route("/changerole").put(verifyJWT,isSA,changeUserRoleToSuperAdmin)

export default router