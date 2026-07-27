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

module.exports = {
    getProducts,
    getProductById,
    createProduct
};