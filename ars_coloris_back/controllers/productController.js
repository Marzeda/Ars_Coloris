const Product = require("../models/Product");


const productService = require(
    "../services/productService"
);

const productImageService = require(
    "../services/productImageService"
);
const getProducts = async (req, res) => {
    try {
        const products =
            await productService.getProducts();

        return res.json(products);
    } catch (error) {
        console.error(
            "Błąd pobierania produktów:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Błąd odczytu produktów"
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product =
            await productService.getProductById(
                Number(req.params.id)
            );

        return res.json(product);
    } catch (error) {
        console.error(
            "Błąd pobierania produktu:",
            error
        );

        return res
            .status(error.status || 500)
            .json({
                success: false,
                message:
                    error.status
                        ? error.message
                        : "Błąd odczytu produktu"
            });
    }
};

const createProduct = async (req, res) => {
    try {
        const product =
            await productService.createProduct(
                req.body
            );

        return res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(
            "Błąd tworzenia produktu:",
            error
        );

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message:
                    "Produkt z takim identyfikatorem już istnieje."
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message:
                    "Dane produktu są nieprawidłowe."
            });
        }

        return res
            .status(error.status || 500)
            .json({
                success: false,
                message:
                    error.status
                        ? error.message
                        : "Nie udało się utworzyć produktu."
            });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product =
            await productService.updateProduct(
                Number(req.params.id),
                req.body
            );

        /*
         * Frontend oczekuje bezpośrednio
         * obiektu produktu.
         */
        return res.json(product);
    } catch (error) {
        console.error(
            "Błąd aktualizacji produktu:",
            error
        );

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message:
                    "Dane produktu są nieprawidłowe."
            });
        }

        return res
            .status(error.status || 500)
            .json({
                success: false,
                message:
                    error.status
                        ? error.message
                        : "Nie udało się zaktualizować produktu."
            });
    }
};

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