require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const {
    verifyToken,
    verifyAdmin
} = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

const usersPath = path.join(
    __dirname,
    "data",
    "users.json"
);

const allowedOrigins = [
    "http://localhost:3000",
    "https://ars-coloris.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

const readUsers = () => {
    const data = fs.readFileSync(
        usersPath,
        "utf8"
    );

    return JSON.parse(data);
};

app.get("/", (req, res) => {
    return res.send(
        "Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech"
    );
});

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
                success: false,
                message:
                    "Błąd odczytu użytkowników"
            });
        }
    }
);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Serwer działa na porcie ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "Nie udało się uruchomić serwera:",
            error
        );

        process.exit(1);
    }
};

startServer();