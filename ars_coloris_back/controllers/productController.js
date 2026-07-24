const Product = require("../models/Product");

const getNextSequence = require("../utils/getNextSequence");

const mapProductForFrontend = (product) => {
    return {
        id: product.legacyId,
        name: product.name,
        category: product.category,
        price: product.price,
        availability: product.availability,
        deliveryTime: product.deliveryTime,
        images: product.images,
        description: product.description,
        isFeatured: product.isFeatured,
        isPublished: product.isPublished,
        displayOrder: product.displayOrder,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({
            isPublished: true
        }).sort({
            displayOrder: 1,
            createdAt: 1
        });

        const mappedProducts =
            products.map(mapProductForFrontend);

        return res.json(mappedProducts);
    } catch (error) {
        console.error(
            "Błąd pobierania produktów z MongoDB:",
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
        const productId =
            Number(req.params.id);

        if (!Number.isInteger(productId)) {
            return res.status(400).json({
                success: false,
                message: "Nieprawidłowe ID produktu"
            });
        }

        const product = await Product.findOne({
            legacyId: productId,
            isPublished: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono produktu"
            });
        }

        return res.json(
            mapProductForFrontend(product)
        );
    } catch (error) {
        console.error(
            "Błąd pobierania produktu z MongoDB:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Błąd odczytu produktu"
        });
    }
};


const createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            availability,
            deliveryTime,
            description,
            images = []
        } = req.body;

        if (
            !name ||
            !category ||
            price === undefined ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: "Brakuje wymaganych pól."
            });
        }

        const legacyId = await getNextSequence("product");

        const product = new Product({
            legacyId,
            name: name.trim(),
            category: category.trim(),
            price: Number(price),
            availability,
            deliveryTime,
            description: description.trim(),
            images,
            isFeatured: false,
            isPublished: true,
            displayOrder: 0
        });

        await product.save();

        return res.status(201).json({
            success: true,
            product: mapProductForFrontend(product)
        });

    } catch (error) {
        console.error(
            "Błąd tworzenia produktu:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Nie udało się utworzyć produktu."
        });
    }
};

const updateProduct = async (req, res) => {
    return res.status(501).json({
        success: false,
        message:
            "Funkcja updateProduct nie została jeszcze zaimplementowana"
    });
};

const deleteProduct = async (req, res) => {
    return res.status(501).json({
        success: false,
        message:
            "Funkcja deleteProduct nie została jeszcze zaimplementowana"
    });
};

const uploadImages = async (req, res) => {
    return res.status(501).json({
        success: false,
        message:
            "Funkcja uploadImages nie została jeszcze zaimplementowana"
    });
};

const deleteImage = async (req, res) => {
    return res.status(501).json({
        success: false,
        message:
            "Funkcja deleteImage nie została jeszcze zaimplementowana"
    });
};

const setMainImage = async (req, res) => {
    return res.status(501).json({
        success: false,
        message:
            "Funkcja setMainImage nie została jeszcze zaimplementowana"
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