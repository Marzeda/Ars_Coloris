const {
    cloudinary
} = require("../cloudinaryConfig");

const {
    getCloudinaryPublicId
} = require("../utils/cloudinaryUtils");

const ServiceError = require(
    "../errors/ServiceError"
);

const deleteImages = async (imagePaths = []) => {
    if (!Array.isArray(imagePaths)) {
        throw new ServiceError(
            "Lista zdjęć jest nieprawidłowa.",
            400
        );
    }

    const results = [];

    for (const imagePath of imagePaths) {
        const publicId =
            getCloudinaryPublicId(imagePath);

        if (!publicId) {
            console.warn(
                "Nie rozpoznano public_id:",
                imagePath
            );

            results.push({
                imagePath,
                publicId: null,
                result: "skipped"
            });

            continue;
        }

        const destroyResult =
            await cloudinary.uploader.destroy(
                publicId,
                {
                    invalidate: true,
                    resource_type: "image"
                }
            );

        if (
            destroyResult.result !== "ok" &&
            destroyResult.result !== "not found"
        ) {
            throw new ServiceError(
                `Cloudinary nie usunęło zdjęcia: ${publicId}`,
                502
            );
        }

        results.push({
            imagePath,
            publicId,
            result: destroyResult.result
        });
    }

    return results;
};

module.exports = {
    deleteImages
};