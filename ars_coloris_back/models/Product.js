const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        legacyId: {
            type: Number,
            unique: true,
            sparse: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        availability: {
            type: String,
            default: "Dostępne",
            trim: true
        },

        deliveryTime: {
            type: String,
            default: "",
            trim: true
        },

        images: {
            type: [String],
            default: []
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        isPublished: {
            type: Boolean,
            default: true
        },

        displayOrder: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        collection: "products"
    }
);
productSchema.virtual("id").get(function () {
    return this.legacyId;
});

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;