const Product = require("../models/Product");

const getProducts = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja getProducts nie została jeszcze zaimplementowana"
    });
};

const getProductById = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja getProductById nie została jeszcze zaimplementowana"
    });
};

const createProduct = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja createProduct nie została jeszcze zaimplementowana"
    });
};

const updateProduct = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja updateProduct nie została jeszcze zaimplementowana"
    });
};

const deleteProduct = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja deleteProduct nie została jeszcze zaimplementowana"
    });
};

const uploadImages = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja uploadImages nie została jeszcze zaimplementowana"
    });
};

const deleteImage = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja deleteImage nie została jeszcze zaimplementowana"
    });
};

const setMainImage = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: "Funkcja setMainImage nie została jeszcze zaimplementowana"
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImages,
    deleteImage,
    setMainImage
};