const getCloudinaryPublicId = (imageUrl) => {
    if (
        typeof imageUrl !== "string" ||
        !imageUrl.includes("res.cloudinary.com")
    ) {
        return null;
    }

    try {
        const url = new URL(imageUrl);
        const pathParts = url.pathname
            .split("/")
            .filter(Boolean);

        const uploadIndex =
            pathParts.indexOf("upload");

        if (uploadIndex === -1) {
            return null;
        }

        const afterUpload =
            pathParts.slice(uploadIndex + 1);

        /*
         * Cloudinary może umieścić transformacje przed wersją:
         *
         * /upload/w_800,q_auto/v123/folder/image.jpg
         *
         * Public ID zaczyna się dopiero po v123.
         */
        const versionIndex =
            afterUpload.findIndex((part) =>
                /^v\d+$/.test(part)
            );

        const publicIdParts =
            versionIndex !== -1
                ? afterUpload.slice(versionIndex + 1)
                : afterUpload;

        if (publicIdParts.length === 0) {
            return null;
        }

        const publicIdWithExtension =
            publicIdParts.join("/");

        return publicIdWithExtension.replace(
            /\.[^/.]+$/,
            ""
        );
    } catch (error) {
        console.error(
            "Nie udało się odczytać public_id Cloudinary:",
            error
        );

        return null;
    }
};

module.exports = {
    getCloudinaryPublicId
};