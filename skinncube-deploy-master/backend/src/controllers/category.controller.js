import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subcategory.model.js";
import { Medicine } from "../models/medicine.model.js";

const getAllCategory = asyncHandler( async (_,res) => {
    const getcat = await Category.find().populate('sub_cat')
    
    res.status(200).json(
        new ApiResponse(200, getcat, "Category Data Sent")
    )
})

const getCategoryById = asyncHandler( async (req,res) => {
    const { slug } = req.params
    // console.log(slug);
    const getcat = await Category.findOne({slug})
    if (!getcat) {
        throw new ApiError(404, "Category not found");
    }
    res.status(200).json(
        new ApiResponse(200, getcat, "Category Data Sent")
    )
})

const createcategory = asyncHandler( async (req,res) => {
    const {name ,description } = req.body

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path
    }
    console.log(imageLocalPath)

    const cat_obj = await Category.create({
        name,
        description,
        image: imageLocalPath || process.env.DEFAULT_IMAGE_PATH
    })

    if (!cat_obj) {
        throw new ApiError(500, "Something went wrong while creating the Category")
    }

    res.status(200).json(
        new ApiResponse(200, cat_obj, "Category Data Created")
    )    
})

const addSubcategory = asyncHandler( async (req,res) => {
    const { categoryId } = req.params;
    const { subcategoryIds } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    // Validate the subcategory IDs and check if they exist
    const validSubcategories = await SubCategory.find({
        _id: { $in: subcategoryIds }
    });

    if (validSubcategories.length !== subcategoryIds.length) {
        throw new ApiError(400, "One or more subcategories do not exist");
    }

    // Append valid subcategories to the category's sub_cat field
    category.sub_cat = [...category.sub_cat, ...subcategoryIds];

    await category.save();

    return res.status(200).json(
        new ApiResponse(200, category, "Subcategories appended successfully")
    );
})

const removeSubcategory = asyncHandler( async (req,res) => {
    const { categoryId } = req.params;
    const { subcategoryIds } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    // Filter out subcategories that should be removed
    category.sub_cat = category.sub_cat.filter(
        (subCatId) => !subcategoryIds.includes(subCatId.toString())
    );

    // Save the updated category
    await category.save();

    return res.status(200).json(
        new ApiResponse(200, category, "Subcategories removed successfully")
    );
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    // Find and delete the category
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    await Medicine.deleteMany({ category: categoryId });

    await SubCategory.deleteMany({ _id: { $in: category.sub_cat } });

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
    throw new ApiError(500, "Failed to delete the category");
    }

    res.status(200).json(
    new ApiResponse(200, null, "Category and associated subcategories deleted successfully")
    );
});

export {
    createcategory,
    getAllCategory,
    getCategoryById,
    addSubcategory,
    removeSubcategory,
    deleteCategory
}