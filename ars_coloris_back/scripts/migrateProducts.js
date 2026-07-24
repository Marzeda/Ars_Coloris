require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Product = require("../models/Product");

const productsFilePath = path.join(
    __dirname,
    "..",
    "data",
    "products.json"
);

const readProductsFromFile = () => {
    if (!fs.existsSync(productsFilePath)) {
        throw new Error(
            `Nie znaleziono pliku products.json: ${productsFilePath}`
        );
    }

    const fileContent = fs.readFileSync(
        productsFilePath,
        "utf8"
    );

    const products = JSON.parse(fileContent);

    if (!Array.isArray(products)) {
        throw new Error(
            "Plik products.json nie zawiera tablicy produktów."
        );
    }

    return products;
};

const validateProduct = (product) => {
    const requiredFields = [
        "id",
        "name",
        "category",
        "price",
        "description"
    ];

    const missingFields = requiredFields.filter(
        (field) =>
            product[field] === undefined ||
            product[field] === null ||
            product[field] === ""
    );

    if (missingFields.length > 0) {
        throw new Error(
            `Brakujące pola: ${missingFields.join(", ")}`
        );
    }

    const price = Number(product.price);

    if (!Number.isFinite(price) || price < 0) {
        throw new Error(
            `Nieprawidłowa cena produktu „${product.name}”.`
        );
    }
};

const normalizeImages = (images) => {
    if (!Array.isArray(images)) {
        return [];
    }

    return images.filter(
        (image) =>
            typeof image === "string" &&
            image.trim() !== ""
    );
};

const migrateSingleProduct = async (
    productData,
    displayOrder
) => {
    validateProduct(productData);

    const existingProduct = await Product.findOne({
        legacyId: Number(productData.id)
    });

    if (existingProduct) {
        console.log(
            `Pominięto „${productData.name}” — dzieło już istnieje.`
        );

        return "skipped";
    }

    await Product.create({
        legacyId: Number(productData.id),
        name: productData.name.trim(),
        category: productData.category.trim(),
        price: Number(productData.price),

        availability:
            typeof productData.availability === "string"
                ? productData.availability.trim()
                : "Dostępne",

        deliveryTime:
            typeof productData.deliveryTime === "string"
                ? productData.deliveryTime.trim()
                : "",

        images: normalizeImages(
            productData.images
        ),

        description:
            productData.description.trim(),

        isFeatured: false,
        isPublished: true,
        displayOrder
    });

    console.log(
        `Dodano dzieło „${productData.name}”.`
    );

    return "created";
};

const migrateProducts = async () => {
    let createdCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    try {
        await connectDB();

        const products =
            readProductsFromFile();

        console.log(
            `Znaleziono ${products.length} dzieł w products.json.`
        );

        for (
            let index = 0;
            index < products.length;
            index += 1
        ) {
            const product = products[index];

            try {
                const result =
                    await migrateSingleProduct(
                        product,
                        index
                    );

                if (result === "created") {
                    createdCount += 1;
                }

                if (result === "skipped") {
                    skippedCount += 1;
                }
            } catch (error) {
                errorCount += 1;

                console.error(
                    `Błąd dzieła „${
                        product.name || "bez nazwy"
                    }”:`
                );

                console.error(error.message);
            }
        }

        console.log("");
        console.log(
            "Migracja dzieł zakończona."
        );
        console.log(`Dodano: ${createdCount}`);
        console.log(`Pominięto: ${skippedCount}`);
        console.log(`Błędy: ${errorCount}`);

        if (errorCount > 0) {
            process.exitCode = 1;
        }
    } catch (error) {
        console.error("");
        console.error(
            "Błąd migracji dzieł:"
        );
        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();

        console.log(
            "Rozłączono z MongoDB Atlas."
        );
    }
};

migrateProducts();