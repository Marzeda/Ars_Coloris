const express = require("express");
const multer = require("multer");

const {
    storage: cloudinaryStorage
} = require("../cloudinaryConfig");

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

const router = express.Router();

const upload = multer({
    storage: cloudinaryStorage
});

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