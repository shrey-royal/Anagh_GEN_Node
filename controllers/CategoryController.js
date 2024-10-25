const categoryModel = require("../models/ProductCategoryModel");

const createCategory = async(req, res) => {
    try {
        const createdCategory = await categoryModel.create(req.body);
        res.status(201).json({
            message: "Category created successfully!",
            data: createdCategory,
        })
    } catch (err) {
        res.status(500).json({
            message: "Error creating category",
            error: err
        })
    }
}

const getAllCategory = async(req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            message: "Category list",
            data: categories
        })
    } catch (err) {
        res.status(500).json({
            message: "Error getting all category",
            error: err
        })
    }
}

module.exports = {
    createCategory,
    getAllCategory
}