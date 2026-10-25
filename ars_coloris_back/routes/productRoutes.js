
const express = require("express");

const {
    getProducts,
    getProductsForManagement,
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

// PUBLICZNA LISTA PRODUKTÓW
router.get(
    "/",
    getProducts
);

// PEŁNA LISTA DLA ARTYSTY I ADMINISTRATORA
// Ta trasa musi znajdować się przed "/:id".
router.get(
    "/manage",
    verifyToken,
    verifyPanelUser,
    getProductsForManagement
);

// PUBLICZNE SZCZEGÓŁY PRODUKTU
router.get(
    "/:id",
    getProductById
);

// DODAWANIE PRODUKTU
router.post(
    "/",
    verifyToken,
    verifyPanelUser,
    createProduct
);

// EDYCJA PRODUKTU
router.put(
    "/:id",
    verifyToken,
    verifyPanelUser,
    updateProduct
);

// USUWANIE PRODUKTU
router.delete(
    "/:id",
    verifyToken,
    verifyPanelUser,
    deleteProduct
);

// DODAWANIE ZDJĘĆ
router.post(
    "/:id/images",
    verifyToken,
    verifyPanelUser,
    upload.array("images", 10),
    uploadImages
);

// USUWANIE ZDJĘCIA
router.delete(
    "/:id/images",
    verifyToken,
    verifyPanelUser,
    deleteImage
);

// USTAWIANIE ZDJĘCIA GŁÓWNEGO
router.put(
    "/:id/main-image",
    verifyToken,
    verifyPanelUser,
    setMainImage
);

module.exports = router;
