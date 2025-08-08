import { Router } from "express";
import { createcategory, getCategoryById, getAllCategory, addSubcategory, removeSubcategory } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create-category").post(upload.fields(
    [
        {
            name: "image",
            maxCount: 1
        }
    ]),verifyJWT,isSA,
    createcategory
)

router.route("/name/:slug").get(getCategoryById)
router.route("/get-all-category").get(getAllCategory)
router.route("/add-sub-category/:categoryId").put(verifyJWT, isSA, addSubcategory)
router.route("/remove-sub-category/:categoryId").put(verifyJWT, isSA, removeSubcategory)

export default router