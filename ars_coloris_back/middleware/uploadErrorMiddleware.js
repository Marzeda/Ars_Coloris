const multer = require("multer");

const uploadErrorMiddleware = (
    error,
    req,
    res,
    next
) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message:
                    "Zdjęcie jest za duże. Maksymalny rozmiar pliku to 10 MB."
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                success: false,
                message:
                    "Przesłano zbyt wiele zdjęć lub użyto nieprawidłowego pola formularza."
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                success: false,
                message:
                    "Przesłano zbyt wiele zdjęć."
            });
        }

        return res.status(400).json({
            success: false,
            message:
                "Wystąpił błąd podczas przesyłania zdjęć."
        });
    }

    if (error?.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({
            success: false,
            message:
                "Dozwolone są wyłącznie pliki JPG, PNG oraz WEBP."
        });
    }

    return next(error);
};

module.exports = uploadErrorMiddleware;