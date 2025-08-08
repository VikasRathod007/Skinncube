import { Router } from "express";
import { verifyJWT, isSA } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createMedicine, getAllMedicines, deleteMedicineById, updateMedicineById } from "../controllers/medicine.controller.js";

const router = Router()

router.route("/add-medicine").post(
    upload.fields([
      { name: "images", maxCount: 1 }
    ]),
    verifyJWT,
    isSA,
    createMedicine
);

router.route("/update-medicine/:id").put(verifyJWT, isSA, updateMedicineById);
router.route("/delete-medicine/:id").delete(verifyJWT, isSA, deleteMedicineById);

router.route("/").get(getAllMedicines);

export default router