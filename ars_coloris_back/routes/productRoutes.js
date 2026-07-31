const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const {
    uploadImages,
    deleteImage,
    setMainImage
} = require(
    "../controllers/productImageController"
);

const {
    verifyToken,
    verifyPanelUser
} = require("../middleware/authMiddleware");

const upload = require(
    "../middleware/uploadMiddleware"
);

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

router.post(
    "/:id/images",
    verifyToken,
    verifyPanelUser,
    upload.array("images", 10),
    uploadImages
);

router.delete(
    "/:id/images",
    verifyToken,
    verifyPanelUser,
    deleteImage
);

router.put(
    "/:id/main-image",
    verifyToken,
    verifyPanelUser,
    setMainImage
);

module.exports = router;