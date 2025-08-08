import { Router } from "express";
import { 
    getAllLabels, 
    getLabelBySlug, 
    createLabel, 
    updateLabelBySlug, 
    deleteLabelBySlug 
} from "../controllers/labels.controller.js";

import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").get(getAllLabels).post(verifyJWT,isSA,createLabel);
router.route("/:slug").get(getLabelBySlug).put(verifyJWT,isSA,updateLabelBySlug).delete(verifyJWT,isSA,deleteLabelBySlug);


export default router