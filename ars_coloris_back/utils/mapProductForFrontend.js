const mapProductForFrontend = (product) => {
    return {
        id: product.legacyId,
        name: product.name,
        category: product.category,
        price: product.price,
        availability: product.availability,
        deliveryTime: product.deliveryTime,
        images: product.images,
        description: product.description,
        isFeatured: product.isFeatured,
        isPublished: product.isPublished,
        displayOrder: product.displayOrder,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
};

module.exports = mapProductForFrontend;