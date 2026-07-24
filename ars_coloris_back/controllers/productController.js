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

        const mappedProducts = products.map(
            mapProductForFrontend
        );

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
        const productId = Number(req.params.id);

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
            price === null ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: "Brakuje wymaganych pól."
            });
        }

        const parsedPrice = Number(price);

        if (
            !Number.isFinite(parsedPrice) ||
            parsedPrice < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Cena produktu jest nieprawidłowa."
            });
        }

        const legacyId = await getNextSequence(
            "product"
        );

        const product = new Product({
            legacyId,
            name: name.trim(),
            category: category.trim(),
            price: parsedPrice,
            availability:
                typeof availability === "string"
                    ? availability.trim()
                    : "Dostępny",
            deliveryTime:
                typeof deliveryTime === "string"
                    ? deliveryTime.trim()
                    : "",
            description: description.trim(),
            images: Array.isArray(images)
                ? images
                : [],
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

        return res.status(500).json({
            success: false,
            message:
                "Nie udało się utworzyć produktu."
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId)) {
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

        const {
            name,
            category,
            price,
            availability,
            deliveryTime,
            description,
            images,
            isFeatured,
            isPublished,
            displayOrder
        } = req.body;

        if (name !== undefined) {
            const trimmedName = String(name).trim();

            if (!trimmedName) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Nazwa produktu nie może być pusta."
                });
            }

            product.name = trimmedName;
        }

        if (category !== undefined) {
            const trimmedCategory =
                String(category).trim();

            if (!trimmedCategory) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Kategoria produktu nie może być pusta."
                });
            }

            product.category = trimmedCategory;
        }

        if (price !== undefined) {
            const parsedPrice = Number(price);

            if (
                !Number.isFinite(parsedPrice) ||
                parsedPrice < 0
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Cena produktu jest nieprawidłowa."
                });
            }

            product.price = parsedPrice;
        }

        if (availability !== undefined) {
            product.availability =
                String(availability).trim();
        }

        if (deliveryTime !== undefined) {
            product.deliveryTime =
                String(deliveryTime).trim();
        }

        if (description !== undefined) {
            const trimmedDescription =
                String(description).trim();

            if (!trimmedDescription) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Opis produktu nie może być pusty."
                });
            }

            product.description =
                trimmedDescription;
        }

        if (images !== undefined) {
            if (!Array.isArray(images)) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Pole images musi być tablicą."
                });
            }

            product.images = images;
        }

        if (isFeatured !== undefined) {
            product.isFeatured =
                Boolean(isFeatured);
        }

        if (isPublished !== undefined) {
            product.isPublished =
                Boolean(isPublished);
        }

        if (displayOrder !== undefined) {
            const parsedDisplayOrder =
                Number(displayOrder);

            if (
                !Number.isFinite(
                    parsedDisplayOrder
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Kolejność wyświetlania jest nieprawidłowa."
                });
            }

            product.displayOrder =
                parsedDisplayOrder;
        }

        await product.save();

        /*
         * Frontend w trybie edycji wykonuje:
         *
         * onProductUpdated(data)
         *
         * dlatego zwracamy bezpośrednio produkt,
         * a nie { success: true, product: ... }.
         */
        return res.json(
            mapProductForFrontend(product)
        );
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

        return res.status(500).json({
            success: false,
            message:
                "Nie udało się zaktualizować produktu."
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId)) {
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

        await Product.deleteOne({
            legacyId: productId
        });

        return res.json({
            success: true,
            message: "Produkt został usunięty."
        });

    } catch (error) {
        console.error(
            "Błąd usuwania produktu:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Nie udało się usunąć produktu."
        });
    }
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