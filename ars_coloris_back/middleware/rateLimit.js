const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Zbyt wiele żądań. Spróbuj ponownie za kilka minut."
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message:
            "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut."
    }
});

module.exports = {
    apiLimiter,
    authLimiter
};