const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error(
            "Błąd konfiguracji: brak zmiennej MONGODB_URI w pliku .env"
        );

        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);

        console.log("Połączono z MongoDB Atlas");
    } catch (error) {
        console.error("Błąd połączenia z MongoDB Atlas:");
        console.error(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;