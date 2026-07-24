const jwt = require("jsonwebtoken");

const JWT_SECRET =
    process.env.JWT_SECRET || "ars_coloris_secret_key";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Brak tokenu"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Nieprawidłowy format tokenu"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Nieprawidłowy token"
        });
    }
};

const verifyPanelUser = (req, res, next) => {
    if (
        req.user.role !== "admin" &&
        req.user.role !== "artist"
    ) {
        return res.status(403).json({
            success: false,
            message: "Brak uprawnień"
        });
    }

    next();
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Brak uprawnień"
        });
    }

    next();
};

module.exports = {
    verifyToken,
    verifyPanelUser,
    verifyAdmin
};