import { Router } from "express";
import { getCart, addOrUpdateCartItem, removeFromCart, clearCart, updateItemQuantity } from "../controllers/cart.controller.js";
import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/getcart").get(verifyJWT, getCart)
router.route("/addupdatecart").post(verifyJWT, addOrUpdateCartItem)
router.route("/updatequantity").post(verifyJWT, updateItemQuantity);
router.route("/removecart/:medicineId").delete(verifyJWT,removeFromCart)
router.route("/clearcart").put(verifyJWT, clearCart)

export default router