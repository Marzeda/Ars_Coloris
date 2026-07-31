require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const connectDB = require("./config/db");
const config = require("./config/appConfig");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const uploadErrorMiddleware = require("./middleware/uploadErrorMiddleware");

const {apiLimiter} = require("./middleware/rateLimit");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://ars-coloris.vercel.app"
];

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);

app.use(compression());

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

app.use("/api", apiLimiter);

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        name: "Ars Coloris API",
        status: "OK"
    });
});


app.use(uploadErrorMiddleware);
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