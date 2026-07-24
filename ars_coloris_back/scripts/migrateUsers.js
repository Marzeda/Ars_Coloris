require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");

const usersFilePath = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);

const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        throw new Error(
            `Nie znaleziono pliku users.json: ${usersFilePath}`
        );
    }

    const fileContent = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(fileContent);

    if (!Array.isArray(users)) {
        throw new Error(
            "Plik users.json nie zawiera tablicy użytkowników."
        );
    }

    return users;
};

const normalizeDate = (value) => {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
};

const getResetData = (user) => {
    const resetTokenExpires = normalizeDate(
        user.resetTokenExpires
    );

    const tokenIsActive =
        Boolean(user.resetToken) &&
        resetTokenExpires &&
        resetTokenExpires.getTime() > Date.now();

    return {
        resetToken: tokenIsActive
            ? user.resetToken
            : null,

        resetTokenExpires: tokenIsActive
            ? resetTokenExpires
            : null
    };
};

const validateUser = (user) => {
    const requiredFields = [
        "id",
        "username",
        "email",
        "password",
        "role"
    ];

    const missingFields = requiredFields.filter(
        (field) =>
            user[field] === undefined ||
            user[field] === null ||
            user[field] === ""
    );

    if (missingFields.length > 0) {
        throw new Error(
            `Użytkownik ma brakujące pola: ${missingFields.join(", ")}`
        );
    }

    if (!["admin", "artist"].includes(user.role)) {
        throw new Error(
            `Nieprawidłowa rola użytkownika „${user.username}”: ${user.role}`
        );
    }
};

const migrateSingleUser = async (userData) => {
    validateUser(userData);

    const normalizedUsername =
        userData.username.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [
            { username: normalizedUsername },
            { legacyId: userData.id }
        ]
    });

    if (existingUser) {
        console.log(
            `Pominięto „${normalizedUsername}” — użytkownik już istnieje.`
        );

        return "skipped";
    }

    const resetData = getResetData(userData);

    await User.create({
        legacyId: userData.id,
        username: normalizedUsername,
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        role: userData.role,
        failedLoginAttempts:
            Number(userData.failedLoginAttempts) || 0,
        lockUntil: normalizeDate(userData.lockUntil),
        resetToken: resetData.resetToken,
        resetTokenExpires:
        resetData.resetTokenExpires,
        isActive: true
    });

    console.log(
        `Dodano użytkownika „${normalizedUsername}”.`
    );

    return "created";
};

const migrateUsers = async () => {
    let createdCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    try {
        await connectDB();

        const users = readUsersFromFile();

        console.log(
            `Znaleziono ${users.length} użytkowników w users.json.`
        );

        for (const user of users) {
            try {
                const result = await migrateSingleUser(user);

                if (result === "created") {
                    createdCount += 1;
                }

                if (result === "skipped") {
                    skippedCount += 1;
                }
            } catch (error) {
                errorCount += 1;

                console.error(
                    `Błąd użytkownika „${user.username || "bez nazwy"}”:`
                );
                console.error(error.message);
            }
        }

        console.log("");
        console.log("Migracja użytkowników zakończona.");
        console.log(`Dodano: ${createdCount}`);
        console.log(`Pominięto: ${skippedCount}`);
        console.log(`Błędy: ${errorCount}`);

        if (errorCount > 0) {
            process.exitCode = 1;
        }
    } catch (error) {
        console.error("");
        console.error("Błąd migracji użytkowników:");
        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();

        console.log("Rozłączono z MongoDB Atlas.");
    }
};

migrateUsers();