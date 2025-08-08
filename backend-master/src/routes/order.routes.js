import { Router } from "express";
import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";
import { orderInitiate } from "../controllers/order.controller.js";

const router = Router()

router.route("/add-medicine").post(verifyJWT,orderInitiate);

export default router