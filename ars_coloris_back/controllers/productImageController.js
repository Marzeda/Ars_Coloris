const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");

const {
    cloudinary
} = require("../cloudinaryConfig");

const {
    getCloudinaryPublicId
} = require("../utils/cloudinaryUtils");

const mapProductForFrontend = require(
    "../utils/mapProductForFrontend"
);

const parseProductId = (value) => {
    const productId = Number(value);

    return Number.isInteger(productId)
        ? productId
        : null;
};

const uploadImages = async (req, res) => {
    try {
        const productId = parseProductId(
            req.params.id
        );

        if (productId === null) {
            return res.status(400).json({
                success: false,
                message: "Nieprawidłowe ID produktu"
            });
        }

        const product = await Product.findOne({
            legacyId: productId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono produktu"
            });
        }

        const uploadedImages =
            Array.isArray(req.files)
                ? req.files
                    .map((file) => file.path)
                    .filter(Boolean)
                : [];

        if (uploadedImages.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "Nie przesłano żadnych zdjęć"
            });
        }

        product.images = [
            ...(product.images || []),
            ...uploadedImages
        ];

        await product.save();

        const mappedProduct =
            mapProductForFrontend(product);

        return res.json({
            success: true,
            message: "Zdjęcia zostały dodane",
            images: mappedProduct.images,
            product: mappedProduct
        });
    } catch (error) {
        console.error(
            "Błąd dodawania zdjęć:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Nie udało się dodać zdjęć"
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const productId = parseProductId(
            req.params.id
        );

        const { imagePath } = req.body;

        if (productId === null) {
            return res.status(400).json({
                success: false,
                message: "Nieprawidłowe ID produktu"
            });
        }

        if (
            typeof imagePath !== "string" ||
            !imagePath.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Nie podano ścieżki zdjęcia"
            });
        }

        const product = await Product.findOne({
            legacyId: productId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono produktu"
            });
        }

        if (
            !Array.isArray(product.images) ||
            !product.images.includes(imagePath)
        ) {
            return res.status(404).json({
                success: false,
                message:
                    "Nie znaleziono zdjęcia produktu"
            });
        }

        product.images = product.images.filter(
            (image) => image !== imagePath
        );

        await product.save();

        const publicId =
            getCloudinaryPublicId(imagePath);


        if (publicId) {
            console.log("Cloudinary imagePath:", imagePath);
            console.log("Cloudinary publicId:", publicId);

            const destroyResult =
                await cloudinary.uploader.destroy(
                    publicId,
                    {
                        invalidate: true,
                        resource_type: "image"
                    }
                );

            console.log(
                "Cloudinary destroy result:",
                destroyResult
            );
        }


        else if (
            imagePath.startsWith("/uploads/")
        ) {
            const relativePath =
                imagePath.replace(/^\/+/, "");

            const fullPath = path.join(
                __dirname,
                "..",
                relativePath
            );

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        return res.json({
            success: true,
            message:
                "Zdjęcie zostało usunięte",
            images: product.images,
            product:
                mapProductForFrontend(product)
        });
    } catch (error) {
        console.error(
            "Błąd usuwania zdjęcia:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Nie udało się usunąć zdjęcia"
        });
    }
};

const setMainImage = async (req, res) => {
    try {
        const productId = parseProductId(
            req.params.id
        );

        const { imagePath } = req.body;

        if (productId === null) {
            return res.status(400).json({
                success: false,
                message: "Nieprawidłowe ID produktu"
            });
        }

        if (
            typeof imagePath !== "string" ||
            !imagePath.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Nie podano ścieżki zdjęcia"
            });
        }

        const product = await Product.findOne({
            legacyId: productId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono produktu"
            });
        }

        if (
            !Array.isArray(product.images) ||
            !product.images.includes(imagePath)
        ) {
            return res.status(404).json({
                success: false,
                message:
                    "Nie znaleziono zdjęcia produktu"
            });
        }

        product.images = [
            imagePath,
            ...product.images.filter(
                (image) => image !== imagePath
            )
        ];

        await product.save();

        const mappedProduct =
            mapProductForFrontend(product);

        return res.json({
            success: true,
            message:
                "Zdjęcie główne zostało ustawione",
            images: mappedProduct.images,
            product: mappedProduct
        });
    } catch (error) {
        console.error(
            "Błąd ustawiania zdjęcia głównego:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Nie udało się ustawić zdjęcia głównego"
        });
    }
};

module.exports = {
    uploadImages,
    deleteImage,
    setMainImage
};