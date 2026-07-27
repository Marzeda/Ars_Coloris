const Product = require("../models/Product");

const mapProductForFrontend = require(
    "../utils/mapProductForFrontend"
);

const ServiceError = require(
    "../errors/ServiceError"
);

const getNextSequence = require(
    "../utils/getNextSequence"
);

const getProducts = async () => {
    const products = await Product.find({
        isPublished: true
    }).sort({
        displayOrder: 1,
        createdAt: 1
    });

    return products.map(
        mapProductForFrontend
    );
};

const getProductById = async (id) => {
    if (!Number.isInteger(id)) {
        throw new ServiceError(
            "Nieprawidłowe ID produktu",
            400
        );
    }

    const product = await Product.findOne({
        legacyId: id,
        isPublished: true
    });

    if (!product) {
        throw new ServiceError(
            "Nie znaleziono produktu",
            404
        );
    }

    return mapProductForFrontend(product);
};

const createProduct = async (data) => {
    const {
        name,
        category,
        price,
        availability,
        deliveryTime,
        description,
        images = []
    } = data;

    if (
        !name ||
        !category ||
        price === undefined ||
        price === null ||
        !description
    ) {
        throw new ServiceError(
            "Brakuje wymaganych pól.",
            400
        );
    }

    const parsedPrice = Number(price);

    if (
        !Number.isFinite(parsedPrice) ||
        parsedPrice < 0
    ) {
        throw new ServiceError(
            "Cena produktu jest nieprawidłowa.",
            400
        );
    }

    const legacyId =
        await getNextSequence("product");

    const product = new Product({
        legacyId,
        name: String(name).trim(),
        category: String(category).trim(),
        price: parsedPrice,

        availability:
            typeof availability === "string"
                ? availability.trim()
                : "Dostępny",

        deliveryTime:
            typeof deliveryTime === "string"
                ? deliveryTime.trim()
                : "",

        description:
            String(description).trim(),

        images: Array.isArray(images)
            ? images
            : [],

        isFeatured: false,
        isPublished: true,
        displayOrder: 0
    });

    await product.save();

    return mapProductForFrontend(product);
};

const updateProduct = async (id, data) => {
    if (!Number.isInteger(id)) {
        throw new ServiceError(
            "Nieprawidłowe ID produktu",
            400
        );
    }

    const product = await Product.findOne({
        legacyId: id
    });

    if (!product) {
        throw new ServiceError(
            "Nie znaleziono produktu",
            404
        );
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
    } = data;

    if (name !== undefined) {
        const trimmedName =
            String(name).trim();

        if (!trimmedName) {
            throw new ServiceError(
                "Nazwa produktu nie może być pusta.",
                400
            );
        }

        product.name = trimmedName;
    }

    if (category !== undefined) {
        const trimmedCategory =
            String(category).trim();

        if (!trimmedCategory) {
            throw new ServiceError(
                "Kategoria produktu nie może być pusta.",
                400
            );
        }

        product.category =
            trimmedCategory;
    }

    if (price !== undefined) {
        const parsedPrice = Number(price);

        if (
            !Number.isFinite(parsedPrice) ||
            parsedPrice < 0
        ) {
            throw new ServiceError(
                "Cena produktu jest nieprawidłowa.",
                400
            );
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
            throw new ServiceError(
                "Opis produktu nie może być pusty.",
                400
            );
        }

        product.description =
            trimmedDescription;
    }

    if (images !== undefined) {
        if (!Array.isArray(images)) {
            throw new ServiceError(
                "Pole images musi być tablicą.",
                400
            );
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
            throw new ServiceError(
                "Kolejność wyświetlania jest nieprawidłowa.",
                400
            );
        }

        product.displayOrder =
            parsedDisplayOrder;
    }

    await product.save();

    return mapProductForFrontend(product);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
};