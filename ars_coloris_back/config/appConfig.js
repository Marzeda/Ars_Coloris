require("dotenv").config();

const requiredEnv = [
    "JWT_SECRET",
    "MONGODB_URI"
];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(
            `Brak wymaganej zmiennej środowiskowej: ${key}`
        );
    }
});

module.exports = {
    app: {
        port: process.env.PORT || 5000,
        frontendUrl:
            process.env.FRONTEND_URL ||
            "http://localhost:3000"
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "2h"
    },

    mongodb: {
        uri: process.env.MONGODB_URI
    },

    cloudinary: {
        cloudName:
        process.env.CLOUDINARY_CLOUD_NAME,

        apiKey:
        process.env.CLOUDINARY_API_KEY,

        apiSecret:
        process.env.CLOUDINARY_API_SECRET
    },

    mail: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};