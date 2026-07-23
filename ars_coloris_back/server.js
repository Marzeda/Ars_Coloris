require("dotenv").config();

const connectDB = require("./config/db");

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { createTransporter } = require("./mail");
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const productsPath = path.join(__dirname, "data", "products.json");
const usersPath = path.join(__dirname, "data", "users.json");

const JWT_SECRET =
    process.env.JWT_SECRET || "ars_coloris_secret_key";

const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:3000";

const upload = multer({
    storage: cloudinaryStorage
});

const readProducts = () => {
    const data = fs.readFileSync(productsPath, "utf8");
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
    const data = fs.readFileSync(usersPath, "utf8");
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(
        usersPath,
        JSON.stringify(users, null, 2),
        "utf8"
    );
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

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
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
    if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
        return null;
    }

    const uploadPart = imageUrl.split("/upload/")[1];

    if (!uploadPart) {
        return null;
    }

    const withoutVersion = uploadPart.replace(/^v[0-9]+\//, "");
    const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, "");

    return withoutExtension;
};

app.get("/", (req, res) => {
    res.send("Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech");
});

app.get("/api/products", (req, res) => {
    try {
        const products = readProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: "Błąd odczytu produktów"
        });
    }
});

app.get("/api/products/:id", (req, res) => {
    try {
        const productId = Number(req.params.id);
        const products = readProducts();

        const product = products.find(
            (item) => item.id === productId
        );

        if (!product) {
            return res.status(404).json({
                message: "Nie znaleziono produktu"
            });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({
            message: "Błąd odczytu produktu"
        });
    }
});

app.post("/api/products", verifyToken, verifyPanelUser, (req, res) => {
    try {
        const products = readProducts();

        const newId =
            products.length > 0
                ? Math.max(...products.map((product) => product.id)) + 1
                : 1;

        const newProduct = {
            id: newId,
            name: req.body.name,
            category: req.body.category,
            price: Number(req.body.price),
            availability: req.body.availability,
            deliveryTime: req.body.deliveryTime,
            images: req.body.images || [],
            description: req.body.description
        };

        products.push(newProduct);
        saveProducts(products);

        res.status(201).json({
            message: "Produkt został dodany",
            product: newProduct
        });
    } catch (err) {
        res.status(500).json({
            message: "Błąd dodawania produktu"
        });
    }
});

app.put("/api/products/:id", verifyToken, verifyPanelUser, (req, res) => {
    try {
        const productId = Number(req.params.id);
        const products = readProducts();

        const productIndex = products.findIndex(
            (product) => product.id === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Nie znaleziono produktu"
            });
        }

        products[productIndex] = {
            ...products[productIndex],
            ...req.body,
            id: productId,
            price: Number(req.body.price)
        };

        saveProducts(products);

        res.json(products[productIndex]);
    } catch (err) {
        res.status(500).json({
            message: "Błąd zapisu produktu"
        });
    }
});

app.put("/api/products/:id/main-image", verifyToken, verifyPanelUser, (req, res) => {
    try {
        const productId = Number(req.params.id);
        const { imagePath } = req.body;

        const products = readProducts();

        const productIndex = products.findIndex(
            (product) => product.id === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Nie znaleziono produktu"
            });
        }

        const product = products[productIndex];

        if (!product.images || !product.images.includes(imagePath)) {
            return res.status(404).json({
                message: "Nie znaleziono zdjęcia"
            });
        }

        product.images = [
            imagePath,
            ...product.images.filter((image) => image !== imagePath)
        ];

        saveProducts(products);

        res.json({
            success: true,
            message: "Zdjęcie główne zostało ustawione",
            images: product.images,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Błąd ustawiania zdjęcia głównego"
        });
    }
});

app.delete("/api/products/:id", verifyToken, verifyPanelUser, (req, res) => {
    try {
        const productId = Number(req.params.id);
        const products = readProducts();

        const productExists = products.find(
            (product) => product.id === productId
        );

        if (!productExists) {
            return res.status(404).json({
                message: "Nie znaleziono produktu"
            });
        }

        const updatedProducts = products.filter(
            (product) => product.id !== productId
        );

        saveProducts(updatedProducts);

        res.json({
            success: true,
            message: "Produkt został usunięty"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Błąd usuwania produktu"
        });
    }
});

app.post(
    "/api/products/:id/images",
    verifyToken,
    verifyPanelUser,
    upload.array("images", 10),
    (req, res) => {
        try {
            const productId = Number(req.params.id);
            const products = readProducts();

            const productIndex = products.findIndex(
                (product) => product.id === productId
            );

            if (productIndex === -1) {
                return res.status(404).json({
                    message: "Nie znaleziono produktu"
                });
            }

            const uploadedImages = req.files.map((file) => {
                return file.path;
            });

            products[productIndex].images = [
                ...(products[productIndex].images || []),
                ...uploadedImages
            ];

            saveProducts(products);

            res.json({
                message: "Zdjęcia zostały dodane",
                images: products[productIndex].images,
                product: products[productIndex]
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                message: "Błąd uploadu zdjęć"
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
            const productId = Number(req.params.id);
            const { imagePath } = req.body;

            const products = readProducts();

            const productIndex = products.findIndex(
                (product) => product.id === productId
            );

            if (productIndex === -1) {
                return res.status(404).json({
                    message: "Nie znaleziono produktu"
                });
            }

            const product = products[productIndex];

            product.images = product.images.filter(
                (image) => image !== imagePath
            );

            saveProducts(products);

            const publicId = getCloudinaryPublicId(imagePath);

            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            } else if (imagePath && imagePath.startsWith("/uploads")) {
                const fullPath = path.join(
                    __dirname,
                    imagePath.replace(/^\//, "")
                );

                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }

            res.json({
                success: true,
                message: "Zdjęcie zostało usunięte",
                images: product.images
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                success: false,
                message: "Błąd usuwania zdjęcia"
            });
        }
    }
);

app.get("/api/users", verifyToken, verifyAdmin, (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Błąd odczytu użytkowników"
        });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = readUsers();

        const userIndex = users.findIndex(
            (user) => user.username === username
        );

        if (userIndex === -1) {
            return res.status(401).json({
                success: false,
                message: "Nieprawidłowy login lub hasło"
            });
        }

        const user = users[userIndex];
        const now = Date.now();

        if (user.lockUntil && now < user.lockUntil) {
            const remainingMinutes = Math.ceil(
                (user.lockUntil - now) / 60000
            );

            return res.status(403).json({
                success: false,
                message: `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            user.failedLoginAttempts =
                (user.failedLoginAttempts || 0) + 1;

            if (user.failedLoginAttempts >= 3) {
                user.lockUntil = now + 2 * 60 * 60 * 1000;
                user.failedLoginAttempts = 0;
            }

            saveUsers(users);

            return res.status(401).json({
                success: false,
                message: "Nieprawidłowy login lub hasło"
            });
        }

        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        saveUsers(users);

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Błąd logowania"
        });
    }
});

app.post("/api/forgot-password", async (req, res) => {
    const { username } = req.body;

    try {
        const users = readUsers();

        const userIndex = users.findIndex(
            (user) => user.username === username
        );

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono użytkownika"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpires = Date.now() + 30 * 60 * 1000;

        users[userIndex].resetToken = resetToken;
        users[userIndex].resetTokenExpires = resetTokenExpires;

        saveUsers(users);

        const resetLink =
            `${FRONTEND_URL}/reset-password/${resetToken}`;

        const transporter =
            await createTransporter();

        const info = await transporter.sendMail({
            from: '"Ars Coloris" <noreply@arscoloris.pl>',
            to: users[userIndex].email || "admin@example.com",
            subject: "Reset hasła Ars Coloris",
            html: `
                <h2>Reset hasła</h2>

                <p>
                    Kliknij poniższy link:
                </p>

                <a href="${resetLink}">
                    ${resetLink}
                </a>

                <p>
                    Link ważny jest 30 minut.
                </p>
            `
        });

        console.log(
            "Preview URL:",
            nodemailer.getTestMessageUrl(info)
        );

        res.json({
            success: true,
            message: "Wysłano wiadomość testową",
            previewUrl:
                nodemailer.getTestMessageUrl(info)
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Błąd resetowania hasła"
        });
    }
});

app.post("/api/reset-password", async (req, res) => {
    const { token, password } = req.body;

    try {
        const users = readUsers();

        const userIndex = users.findIndex(
            (user) => user.resetToken === token
        );

        if (userIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Nieprawidłowy token resetowania hasła"
            });
        }

        const user = users[userIndex];

        if (
            !user.resetTokenExpires ||
            Date.now() > user.resetTokenExpires
        ) {
            return res.status(400).json({
                success: false,
                message: "Token resetowania hasła wygasł"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        saveUsers(users);

        res.json({
            success: true,
            message: "Hasło zostało zmienione"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Błąd zmiany hasła"
        });
    }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Serwer działa na porcie ${PORT}`);
    });
};

startServer();