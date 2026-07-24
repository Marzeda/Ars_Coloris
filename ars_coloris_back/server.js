require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const {
    cloudinary,
    storage: cloudinaryStorage
} = require("./cloudinaryConfig");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://ars-coloris.vercel.app"
        ],
        credentials: true
    })
);

app.use(express.json());

app.use("/api", authRoutes);

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

const productsPath = path.join(
    __dirname,
    "data",
    "products.json"
);

const usersPath = path.join(
    __dirname,
    "data",
    "users.json"
);

const JWT_SECRET =
    process.env.JWT_SECRET || "ars_coloris_secret_key";

const upload = multer({
    storage: cloudinaryStorage
});

const readProducts = () => {
    const data = fs.readFileSync(
        productsPath,
        "utf8"
    );

    return JSON.parse(data);
};

const saveProducts = (products) => {
    fs.writeFileSync(
        productsPath,
        JSON.stringify(products, null, 2),
        "utf8"
    );
};

const readUsers = () => {
    const data = fs.readFileSync(
        usersPath,
        "utf8"
    );

    return JSON.parse(data);
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Brak tokenu"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Nieprawidłowy format tokenu"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Nieprawidłowy token"
        });
    }
};

const verifyPanelUser = (req, res, next) => {
    if (
        req.user.role !== "admin" &&
        req.user.role !== "artist"
    ) {
        return res.status(403).json({
            success: false,
            message: "Brak uprawnień"
        });
    }

    next();
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Brak uprawnień"
        });
    }

    next();
};

const getCloudinaryPublicId = (imageUrl) => {
    if (
        !imageUrl ||
        !imageUrl.includes("res.cloudinary.com")
    ) {
        return null;
    }

    const uploadPart =
        imageUrl.split("/upload/")[1];

    if (!uploadPart) {
        return null;
    }

    const withoutVersion =
        uploadPart.replace(
            /^v[0-9]+\//,
            ""
        );

    return withoutVersion.replace(
        /\.[^/.]+$/,
        ""
    );
};

app.get("/", (req, res) => {
    res.send(
        "Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech"
    );
});

app.get("/api/products", (req, res) => {
    try {
        const products = readProducts();

        return res.json(products);
    } catch (error) {
        console.error(
            "Błąd odczytu produktów:",
            error
        );

        return res.status(500).json({
            message: "Błąd odczytu produktów"
        });
    }
});

app.get("/api/products/:id", (req, res) => {
    try {
        const productId =
            Number(req.params.id);

        const products = readProducts();

        const product = products.find(
            (item) => item.id === productId
        );

        if (!product) {
            return res.status(404).json({
                message: "Nie znaleziono produktu"
            });
        }

        return res.json(product);
    } catch (error) {
        console.error(
            "Błąd odczytu produktu:",
            error
        );

        return res.status(500).json({
            message: "Błąd odczytu produktu"
        });
    }
});

app.post(
    "/api/products",
    verifyToken,
    verifyPanelUser,
    (req, res) => {
        try {
            const products = readProducts();

            const newId =
                products.length > 0
                    ? Math.max(
                    ...products.map(
                        (product) => product.id
                    )
                ) + 1
                    : 1;

            const newProduct = {
                id: newId,
                name: req.body.name,
                category: req.body.category,
                price: Number(req.body.price),
                availability:
                req.body.availability,
                deliveryTime:
                req.body.deliveryTime,
                images: req.body.images || [],
                description:
                req.body.description
            };

            products.push(newProduct);

            saveProducts(products);

            return res.status(201).json({
                message:
                    "Produkt został dodany",
                product: newProduct
            });
        } catch (error) {
            console.error(
                "Błąd dodawania produktu:",
                error
            );

            return res.status(500).json({
                message:
                    "Błąd dodawania produktu"
            });
        }
    }
);

app.put(
    "/api/products/:id",
    verifyToken,
    verifyPanelUser,
    (req, res) => {
        try {
            const productId =
                Number(req.params.id);

            const products = readProducts();

            const productIndex =
                products.findIndex(
                    (product) =>
                        product.id === productId
                );

            if (productIndex === -1) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono produktu"
                });
            }

            products[productIndex] = {
                ...products[productIndex],
                ...req.body,
                id: productId,
                price: Number(req.body.price)
            };

            saveProducts(products);

            return res.json(
                products[productIndex]
            );
        } catch (error) {
            console.error(
                "Błąd zapisu produktu:",
                error
            );

            return res.status(500).json({
                message:
                    "Błąd zapisu produktu"
            });
        }
    }
);

app.put(
    "/api/products/:id/main-image",
    verifyToken,
    verifyPanelUser,
    (req, res) => {
        try {
            const productId =
                Number(req.params.id);

            const { imagePath } = req.body;

            const products = readProducts();

            const productIndex =
                products.findIndex(
                    (product) =>
                        product.id === productId
                );

            if (productIndex === -1) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono produktu"
                });
            }

            const product =
                products[productIndex];

            if (
                !product.images ||
                !product.images.includes(imagePath)
            ) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono zdjęcia"
                });
            }

            product.images = [
                imagePath,
                ...product.images.filter(
                    (image) =>
                        image !== imagePath
                )
            ];

            saveProducts(products);

            return res.json({
                success: true,
                message:
                    "Zdjęcie główne zostało ustawione",
                images: product.images,
                product
            });
        } catch (error) {
            console.error(
                "Błąd ustawiania zdjęcia głównego:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Błąd ustawiania zdjęcia głównego"
            });
        }
    }
);

app.delete(
    "/api/products/:id",
    verifyToken,
    verifyPanelUser,
    (req, res) => {
        try {
            const productId =
                Number(req.params.id);

            const products = readProducts();

            const productExists =
                products.find(
                    (product) =>
                        product.id === productId
                );

            if (!productExists) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono produktu"
                });
            }

            const updatedProducts =
                products.filter(
                    (product) =>
                        product.id !== productId
                );

            saveProducts(updatedProducts);

            return res.json({
                success: true,
                message:
                    "Produkt został usunięty"
            });
        } catch (error) {
            console.error(
                "Błąd usuwania produktu:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Błąd usuwania produktu"
            });
        }
    }
);

app.post(
    "/api/products/:id/images",
    verifyToken,
    verifyPanelUser,
    upload.array("images", 10),
    (req, res) => {
        try {
            const productId =
                Number(req.params.id);

            const products = readProducts();

            const productIndex =
                products.findIndex(
                    (product) =>
                        product.id === productId
                );

            if (productIndex === -1) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono produktu"
                });
            }

            const uploadedImages =
                req.files.map(
                    (file) => file.path
                );

            products[productIndex].images = [
                ...(
                    products[productIndex]
                        .images || []
                ),
                ...uploadedImages
            ];

            saveProducts(products);

            return res.json({
                message:
                    "Zdjęcia zostały dodane",
                images:
                products[productIndex]
                    .images,
                product:
                    products[productIndex]
            });
        } catch (error) {
            console.error(
                "Błąd uploadu zdjęć:",
                error
            );

            return res.status(500).json({
                message:
                    "Błąd uploadu zdjęć"
            });
        }
    }
);

app.delete(
    "/api/products/:id/images",
    verifyToken,
    verifyPanelUser,
    async (req, res) => {
        try {
            const productId =
                Number(req.params.id);

            const { imagePath } = req.body;

            const products = readProducts();

            const productIndex =
                products.findIndex(
                    (product) =>
                        product.id === productId
                );

            if (productIndex === -1) {
                return res.status(404).json({
                    message:
                        "Nie znaleziono produktu"
                });
            }

            const product =
                products[productIndex];

            product.images =
                product.images.filter(
                    (image) =>
                        image !== imagePath
                );

            saveProducts(products);

            const publicId =
                getCloudinaryPublicId(
                    imagePath
                );

            if (publicId) {
                await cloudinary.uploader.destroy(
                    publicId
                );
            } else if (
                imagePath &&
                imagePath.startsWith("/uploads")
            ) {
                const fullPath = path.join(
                    __dirname,
                    imagePath.replace(
                        /^\//,
                        ""
                    )
                );

                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }

            return res.json({
                success: true,
                message:
                    "Zdjęcie zostało usunięte",
                images: product.images
            });
        } catch (error) {
            console.error(
                "Błąd usuwania zdjęcia:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Błąd usuwania zdjęcia"
            });
        }
    }
);

app.get(
    "/api/users",
    verifyToken,
    verifyAdmin,
    (req, res) => {
        try {
            const users = readUsers();

            return res.json(users);
        } catch (error) {
            console.error(
                "Błąd odczytu użytkowników:",
                error
            );

            return res.status(500).json({
                message:
                    "Błąd odczytu użytkowników"
            });
        }
    }
);

const PORT =
    process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `Serwer działa na porcie ${PORT}`
        );
    });
};

startServer();