const ServiceError = require(
    "../errors/ServiceError"
);

const errorMiddleware = (
    error,
    req,
    res,
    next
) => {

    if (error instanceof ServiceError) {
        return res.status(error.status).json({
            success: false,
            message: error.message
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message:
                "Przesłane dane są nieprawidłowe."
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message:
                "Dane o takim identyfikatorze już istnieją."
        });
    }

    console.error(
        "[UNEXPECTED ERROR]",
        error
    );

    return res.status(500).json({
        success: false,
        message:
            "Wystąpił nieoczekiwany błąd serwera."
    });
};

module.exports = errorMiddleware;