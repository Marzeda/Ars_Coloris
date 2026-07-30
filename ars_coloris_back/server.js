require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config/appConfig");
const errorMiddleware = require(
    "./middleware/errorMiddleware"
);

const app = express();


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
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    return res.send(
        "Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech"
    );
});

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    return res.send(
        "Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech"
    );
});

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectDB();


        app.listen(config.app.port, () => {
            console.log(
                `Serwer działa na porcie ${config.app.port}`
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