const express = require("express");

const {
    loginUser,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const {
    authLimiter
} = require("../middleware/rateLimit");

const router = express.Router();

router.post(
    "/login",
    authLimiter,
    loginUser
);

router.post(
    "/forgot-password",
    authLimiter,
    forgotPassword
);

router.post(
    "/reset-password",
    authLimiter,
    resetPassword
);

module.exports = router;