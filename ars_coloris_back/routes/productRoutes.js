const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct
} = require("../controllers/productController");

const {
    verifyToken,
    verifyPanelUser
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    getProducts
);

router.get(
    "/:id",
    getProductById
);

router.post(
    "/",
    verifyToken,
    verifyPanelUser,
    createProduct
);

module.exports = router;