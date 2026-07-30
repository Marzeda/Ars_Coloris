const asyncHandler = require(
    "../middleware/asyncHandler"
);

const Product = require("../models/Product");


const productService = require(
    "../services/productService"
);

const productImageService = require(
    "../services/productImageService"
);
const getProducts = asyncHandler(
    async (req, res) => {
        const products =
            await productService.getProducts();

        return res.json(products);
    }
);
const getProductById = asyncHandler(
    async (req, res) => {
        const product =
            await productService.getProductById(
                Number(req.params.id)
            );

        return res.json(product);
    }
);

const createProduct = asyncHandler(
    async (req, res) => {
        const product =
            await productService.createProduct(
                req.body
            );

        return res.status(201).json({
            success: true,
            product
        });
    }
);
const updateProduct = asyncHandler(
    async (req, res) => {
        const product =
            await productService.updateProduct(
                Number(req.params.id),
                req.body
            );

        return res.json(product);
    }
);
const deleteProduct = async (req, res) => {
    try {
        const productId =
            Number(req.params.id);

        if (!Number.isInteger(productId)) {
            return res.status(400).json({
                success: false,
                message:
                    "Nieprawidłowe ID produktu"
            });
        }

        const product = await Product.findOne({
            legacyId: productId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message:
                    "Nie znaleziono produktu"
            });
        }

        const images =
            Array.isArray(product.images)
                ? product.images
                : [];

        await productImageService.deleteImages(
            images
        );

        await product.deleteOne();

        return res.json({
            success: true,
            message:
                "Produkt i jego zdjęcia zostały usunięte."
        });
    } catch (error) {
        console.error(
            "Błąd usuwania produktu:",
            error
        );

        return res
            .status(error.status || 500)
            .json({
                success: false,
                message:
                    error.status
                        ? error.message
                        : "Nie udało się usunąć produktu."
            });
    }
};
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};