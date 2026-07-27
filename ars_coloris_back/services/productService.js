const Product = require("../models/Product");

const mapProductForFrontend = require(
    "../utils/mapProductForFrontend"
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

module.exports = {
    getProducts
};