const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
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

router.put(
    "/:id",
    verifyToken,
    verifyPanelUser,
    updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    verifyPanelUser,
    deleteProduct
);

module.exports = router;