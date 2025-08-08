import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Label } from "../models/labels.model.js";

const getAllLabels = asyncHandler( async (_,res) => {
    const getcat = await Label.find()    
    res.status(200).json(
        new ApiResponse(200, getcat, "Label Data Sent")
    )
})

const getLabelBySlug = asyncHandler( async (req,res) => {
    const { slug } = req.params
    // console.log(slug);
    const getcat = await Label.findOne({slug})
    if (!getcat) {
        throw new ApiError(404, "Label not found");
    }
    res.status(200).json(
        new ApiResponse(200, getcat, "Label Data Sent")
    )
})

const createLabel = asyncHandler( async (req,res) => {
    const { name ,description } = req.body

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Name is required");
    }
    
    const cat_obj = await Label.create({
        name,
        description
    })

    if (!cat_obj) {
        throw new ApiError(500, "Something went wrong while creating the Label")
    }

    res.status(200).json(
        new ApiResponse(200, cat_obj, "Label Data Created")
    )    
})

const updateLabelBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { name, description } = req.body;

    const label = await Label.findOne({ slug });
    if (!label) {
        throw new ApiError(404, "Label not found");
    }

    label.name = name || label.name;
    label.description = description || label.description;

    await label.save();

    return res.status(200).json(
        new ApiResponse(200, label, "Label updated successfully")
    );
});

const deleteLabelBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const label = await Label.findOneAndDelete({ slug });
    if (!label) {
        throw new ApiError(404, "Label not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Label deleted successfully")
    );
});

export {
    createLabel,
    getAllLabels,
    getLabelBySlug,
    updateLabelBySlug,
    deleteLabelBySlug
}