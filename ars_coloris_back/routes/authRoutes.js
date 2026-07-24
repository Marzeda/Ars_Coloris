const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { createTransporter } = require("../mail");

const router = express.Router();

const usersPath = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);

const JWT_SECRET =
    process.env.JWT_SECRET || "ars_coloris_secret_key";

const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:3000";

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

router.post("/login", async (req, res) => {
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
                message:
                    `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`
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
                user.lockUntil =
                    now + 2 * 60 * 60 * 1000;

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

        return res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Błąd logowania:", error);

        return res.status(500).json({
            success: false,
            message: "Błąd logowania"
        });
    }
});

router.post("/forgot-password", async (req, res) => {
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

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        const resetTokenExpires =
            Date.now() + 30 * 60 * 1000;

        users[userIndex].resetToken = resetToken;
        users[userIndex].resetTokenExpires =
            resetTokenExpires;

        saveUsers(users);

        const resetLink =
            `${FRONTEND_URL}/reset-password/${resetToken}`;

        const transporter = await createTransporter();

        const info = await transporter.sendMail({
            from: '"Ars Coloris" <noreply@arscoloris.pl>',
            to:
                users[userIndex].email ||
                "admin@example.com",
            subject: "Reset hasła Ars Coloris",
            html: `
                <h2>Reset hasła</h2>

                <p>Kliknij poniższy link:</p>

                <a href="${resetLink}">
                    ${resetLink}
                </a>

                <p>Link ważny jest 30 minut.</p>
            `
        });

        const previewUrl =
            nodemailer.getTestMessageUrl(info);

        console.log("Preview URL:", previewUrl);

        return res.json({
            success: true,
            message: "Wysłano wiadomość testową",
            previewUrl
        });
    } catch (error) {
        console.error(
            "Błąd resetowania hasła:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Błąd resetowania hasła"
        });
    }
});

router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;

    try {
        const users = readUsers();

        const userIndex = users.findIndex(
            (user) => user.resetToken === token
        );

        if (userIndex === -1) {
            return res.status(400).json({
                success: false,
                message:
                    "Nieprawidłowy token resetowania hasła"
            });
        }

        const user = users[userIndex];

        if (
            !user.resetTokenExpires ||
            Date.now() > user.resetTokenExpires
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Token resetowania hasła wygasł"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        saveUsers(users);

        return res.json({
            success: true,
            message: "Hasło zostało zmienione"
        });
    } catch (error) {
        console.error(
            "Błąd zmiany hasła:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Błąd zmiany hasła"
        });
    }
});

module.exports = router;