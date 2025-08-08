import { Router } from "express";
import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";
import { checkStatus, getOrders, orderInitiate, updateOrdersAddPharmacy } from "../controllers/order.controller.js";

const router = Router()

router.route("/initiate-payment").post(verifyJWT,orderInitiate);
router.route("/status/:txId").post(checkStatus);
router.route("/update-orders-add-pharmacy").post(verifyJWT,isSA,updateOrdersAddPharmacy);
router.route("/get-orders").get(verifyJWT,getOrders);

export default router