
const mapProductForFrontend = (product) => ({
    id: product.legacyId,
    name: product.name,
    category: product.category,
    price: product.price,
    availability: product.availability,

    // Status sprzedaży produktu
    saleStatus: product.saleStatus || "available",

    deliveryTime: product.deliveryTime,
    images: product.images,
    description: product.description,
    isFeatured: product.isFeatured,
    isPublished: product.isPublished,
    displayOrder: product.displayOrder,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
});

module.exports = mapProductForFrontend;
