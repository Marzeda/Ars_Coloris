const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const productsPath = path.join(__dirname, "data", "products.json");
const usersPath = path.join(__dirname, "data", "users.json");

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

const createSlug = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ł/g, "l")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const productId = Number(req.params.id);
        const products = readProducts();

        const product = products.find(
            (item) => item.id === productId
        );

        if (!product) {
            return cb(new Error("Nie znaleziono produktu"));
        }

        const folderName = createSlug(product.name);
        const uploadPath = path.join(
            __dirname,
            "uploads",
            "products",
            folderName
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            file.originalname
                .toLowerCase()
                .replace(/\s+/g, "-");

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

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

app.post("/api/products", (req, res) => {
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

app.put("/api/products/:id", (req, res) => {
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

app.put("/api/products/:id/main-image", (req, res) => {
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

app.delete("/api/products/:id", (req, res) => {
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

            const folderName = createSlug(products[productIndex].name);

            const uploadedImages = req.files.map((file) => {
                return `/uploads/products/${folderName}/${file.filename}`;
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
            res.status(500).json({
                message: "Błąd uploadu zdjęć"
            });
        }
    }
);

app.delete("/api/products/:id/images", (req, res) => {
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

        const fullPath = path.join(
            __dirname,
            imagePath.replace(/^\//, "")
        );

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
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
});

app.get("/api/users", (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Błąd odczytu użytkowników"
        });
    }
});

app.post("/api/login", async(req, res) => {
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

        res.json({
            success: true,
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


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});