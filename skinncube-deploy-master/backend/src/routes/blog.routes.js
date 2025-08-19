import { Router } from "express";
import {
    createBlog,
    updateBlog,
    toggleBlogStatus,
    deleteBlog,
    getAllBlogs,
    getBlogBySlug,
    toggleBlogLike,
    getBlogCategories,
    getFeaturedBlogs
} from "../controllers/blog.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllBlogs);
router.route("/categories").get(getBlogCategories);
router.route("/featured").get(getFeaturedBlogs);
router.route("/slug/:slug").get(getBlogBySlug);

// Protected routes (require authentication)
router.route("/:id/like").post(verifyJWT, toggleBlogLike);

// Admin only routes
router.route("/create").post(
    verifyJWT,
    isAdmin,
    upload.fields([
        { name: "featuredImage", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    createBlog
);
router.route("/:id").put(
    verifyJWT,
    isAdmin,
    upload.fields([
        { name: "featuredImage", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    updateBlog
);
router.route("/:id/status").patch(verifyJWT, isAdmin, toggleBlogStatus);
router.route("/:id").delete(verifyJWT, isAdmin, deleteBlog);

export default router;
