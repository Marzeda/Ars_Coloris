const multer = require("multer");

const {
    storage: cloudinaryStorage
} = require("../cloudinaryConfig");

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const fileFilter = (req, file, callback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        return callback(null, true);
    }

    const error = new Error(
        "Dozwolone są wyłącznie pliki JPG, PNG oraz WEBP."
    );

    error.code = "INVALID_FILE_TYPE";

    return callback(error, false);
};

const upload = multer({
    storage: cloudinaryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;