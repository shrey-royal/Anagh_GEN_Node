const productModel = require("../models/ProductModel")

const addProduct = async(req, res) => {
    try {
        const createdProduct = await productModel.create(req.body);
        res.status(201).json({
            message: "Product created successfully!",
            data: createdProduct
        })
    } catch (err) {
        res.status(500).json({
            message: "Error adding the product",
            error: err
        })
    }
}

const getAllProducts = async(req, res) => {
    try {
        const products = await productModel.find({status: true}).populate('category');
        res.status(200).json({
            message: "Product list",
            data: products
        })
    } catch (err) {
        res.status(500).json({
            message: "Error getting all products",
            error: err
        })
    }
}

module.exports = {
    addProduct,
    getAllProducts
}