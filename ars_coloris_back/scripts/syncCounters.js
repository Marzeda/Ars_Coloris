require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Product = require("../models/Product");
const Counter = require("../models/Counter");

const syncProductCounter = async () => {
    const lastProduct = await Product.findOne()
        .sort({ legacyId: -1 })
        .select("legacyId");

    const lastLegacyId = lastProduct
        ? lastProduct.legacyId
        : 0;

    await Counter.findByIdAndUpdate(
        "product",
        {
            seq: lastLegacyId
        },
        {
            upsert: true,
            returnDocument: "after",
            setDefaultsOnInsert: true
        }
    );

    console.log(
        `Licznik produktów ustawiono na ${lastLegacyId}.`
    );
};

(async () => {
    try {
        await connectDB();

        await syncProductCounter();

        console.log(
            "Synchronizacja liczników zakończona."
        );
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
        console.log("Rozłączono z MongoDB Atlas.");
    }
})();