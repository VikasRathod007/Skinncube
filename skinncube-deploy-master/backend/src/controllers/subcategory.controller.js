import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SubCategory } from "../models/subcategory.model.js";
import { Category } from "../models/category.model.js";
import { Medicine } from "../models/medicine.model.js";

const getAllSubCategory = asyncHandler( async (_,res) => {
    const getsubcat = await SubCategory.find()
    
    res.status(200).json(
        new ApiResponse(200, getsubcat, "Subcategory Data Sent")
    )
})

const getSubCategoryById = asyncHandler( async (req,res) => {
    const { slug } = req.params
    // console.log(slug);
    const getsubcat = await SubCategory.findOne({slug})
    if (!getsubcat) {
        throw new ApiError(404, "Subcategory not found");
    }
    res.status(200).json(
        new ApiResponse(200, getsubcat, "Subcategory Data Sent")
    )
})

const createSubcategory = asyncHandler( async (req,res) => {
    const {name ,description } = req.body

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path
    }
    console.log(imageLocalPath)

    const subcat_obj = await SubCategory.create({
        name,
        description,
        image: imageLocalPath || process.env.DEFAULT_IMAGE_PATH
    })

    if (!subcat_obj) {
        throw new ApiError(500, "Something went wrong while creating the subcategory")
    }

    res.status(200).json(
        new ApiResponse(200, subcat_obj, "Subcategory Data Created")
    )    
})

const CreateSubCategoryInsideCategory = asyncHandler( async (req,res) => {
    const { name, description, categoryId } = req.body;

    if (!name || !categoryId) {
        throw new ApiError(400, "Name and category ID are required.");
    }

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path;
    }

    const subcat_obj = await SubCategory.create({
        name,
        description,
        image: imageLocalPath || process.env.DEFAULT_IMAGE_PATH,
    });

    if (!subcat_obj) {
        throw new ApiError(500, "Something went wrong while creating the subcategory");
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    category.sub_cat.push(subcat_obj._id);
    await category.save();

    res.status(200).json(
        new ApiResponse(200, subcat_obj, "Subcategory Data Created")
    );
})

const deleteSubCategory = asyncHandler(async (req, res) => {
    const { subCategoryId } = req.params;
  
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      throw new ApiError(404, "Subcategory not found");
    }

    await Category.updateMany(
      { sub_cat: subCategoryId },
      { $pull: { sub_cat: subCategoryId } }
    );
  
    // Delete the subcategory
    await Medicine.deleteMany({ subcategory: subCategoryId });
    await SubCategory.deleteOne({ _id: subCategoryId });
  
    res.status(200).json(
      new ApiResponse(200, null, "Subcategory deleted successfully")
    );
  });

export {
    createSubcategory,
    getAllSubCategory,
    getSubCategoryById,
    CreateSubCategoryInsideCategory,
    deleteSubCategory
}