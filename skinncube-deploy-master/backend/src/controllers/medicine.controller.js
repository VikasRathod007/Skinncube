import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SubCategory } from "../models/subcategory.model.js"
import { Category } from "../models/category.model.js"
import sharp from "sharp";
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs";

const getAllMedicines = asyncHandler(async (req, res) => {
    const { page = 1, limit = 12, sort = "createdAt", order = "desc", priceMin, priceMax, search, category, subcategory } = req.query;

    const filter = {};
    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }
    if (priceMin || priceMax) {
        filter.price = {};
        if (priceMin) filter.price.$gte = parseFloat(priceMin);
        if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }
    if (category) {
        filter.category = category;
    }
    if (subcategory) {
        filter.subcategory = subcategory;
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;
    const sortBy = { [sort]: order === "desc" ? -1 : 1 };

    const medicines = await Medicine.find(filter)
        .populate("labels category subcategory")
        .sort(sortBy)
        .skip(skip)
        .limit(parseInt(limit))
        .select("-user");

    if (!medicines || medicines.length === 0) {
        throw new ApiError(404, "No Medicines found");
    }
    const totalCount = await Medicine.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(200, medicines, "Medicines fetched successfully", {
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page),
            totalCount
        })
    );
});

const getMedicineById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findById(id).populate('labels');
    if (!medicine) {
        throw new ApiError(404, "Medicine not found");
    }
    return res.status(200).json(
        new ApiResponse(200, medicine, "Medicine fetched successfully")
    );
});

const createMedicine = asyncHandler(async (req, res) => {
    // required fields -> name, price, quantity, category, user, subcategory
    // optional fields -> description, prescription required (default: no), images array, labels
    // const { categoryId, subCategoryId } = req.params
    const { name, description, price, quantity, prescriptionRequired, labels, categoryId, subCategoryId } = req.body;
    if (
        [name, price, quantity].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All mandatory fields (name, price, quantity) are required")
    }


    const loggeduser = req.user
    // optional check, if user is SA or not
    if (String(loggeduser.role || '').toUpperCase() !== "SUPERADMIN") {
        throw new ApiError(403, "Admin Role required")
    }
    // check if category and subcategory exists
    const subcategoryExists = await SubCategory.findById(subCategoryId);
    if (!subcategoryExists) {
        throw new ApiError(404, "Subcategory not found");
    }
    const CategoryExists = await Category.findById(categoryId);
    if (!CategoryExists) {
        throw new ApiError(404, "Category not found");
    }
    // console.log("*****************");

    // console.log(req.files.images)
    // Code for multiple image upload
    // let imagesArray = [];
    // if (req.files && req.files.images) {
    //     imagesArray = req.files.images.map((file) => file.path);
    // }
    // imagesArray = [...imagesArray]
    // if(imagesArray.length === 0){
    //     imagesArray = [...imagesArray, "/public/temp/empty_image.jpg"]
    // }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const imageLocalPath = req.files?.images?.[0]?.path || process.env.DEFAULT_IMAGE_PATH;
    if (!fs.existsSync(imageLocalPath)) {
        throw new ApiError(500, "Default image file not found");
    }

    const outputPath = path.join("public/resized", `resized-${path.basename(imageLocalPath)}`);
    try {
        await sharp(imageLocalPath).resize(300, 300).toFile(outputPath);
    } catch (err) {
        throw new ApiError(500, "Error processing image");
    }

    const medicine = await Medicine.create({
        name,
        description,
        price,
        quantity,
        images: outputPath || imageLocalPath,
        subcategory: subCategoryId,
        category: categoryId,
        user: loggeduser._id,
        labels,
        prescriptionRequired: prescriptionRequired || false
    });

    if (!medicine) {
        throw new ApiError(500, "Something went wrong while adding the medicine")
    }

    return res.status(201).json(
        new ApiResponse(201, medicine, "Medicine created successfully")
    );
});

// Delete a medicine by ID
const deleteMedicineById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
        throw new ApiError(404, "Medicine not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Medicine deleted successfully")
    );
});

const updateMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        console.log(`Received update request for medicine ID: ${id}`);
        console.log('Update data:', updateData);

        const updatedMedicine = await Medicine.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.status(204).json(updatedMedicine);
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({ message: 'An error occurred while updating the medicine' });
    }
};


export {
    createMedicine,
    getAllMedicines,
    deleteMedicineById,
    updateMedicineById
};
