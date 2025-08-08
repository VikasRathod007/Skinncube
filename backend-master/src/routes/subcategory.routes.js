import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllSubCategory, createSubcategory, getSubCategoryById } from "../controllers/subcategory.controller.js";
import { isSA, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create-subcategory").post(upload.fields(
    [
        {
            name: "image",
            maxCount: 1
        }
    ]),verifyJWT,isSA,
    createSubcategory
)
router.route("/get-all-sub-category").get(getAllSubCategory)
router.route("/name/:slug").get(getSubCategoryById)


export default router