const getCloudinaryPublicId = (imageUrl) => {
    if (
        !imageUrl ||
        !imageUrl.includes("res.cloudinary.com")
    ) {
        return null;
    }

    const uploadPart = imageUrl.split("/upload/")[1];

    if (!uploadPart) {
        return null;
    }

    const withoutVersion = uploadPart.replace(
        /^v[0-9]+\//,
        ""
    );

    return withoutVersion.replace(
        /\.[^/.]+$/,
        ""
    );
};

module.exports = {
    getCloudinaryPublicId
};