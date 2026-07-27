const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const config = require("../config/appConfig");

const authService = require(
    "../services/authService"
);

const User = require("../models/User");
const { createTransporter } = require("../mail");

const MAX_LOGIN_ATTEMPTS = 3;
const ACCOUNT_LOCK_TIME_MS = 2 * 60 * 60 * 1000;
const RESET_TOKEN_TIME_MS = 30 * 60 * 1000;

const normalizeUsername = (username) => {
    return username.trim().toLowerCase();
};

const loginUser = async (req, res) => {
    try {
        const result =
            await authService.login(req.body);

        return res.json(result);
    } catch (error) {
        console.error("Błąd logowania:", error);

        return res
            .status(error.status || 500)
            .json({
                success: false,
                message:
                    error.status
                        ? error.message
                        : "Błąd logowania"
            });
    }
};
const forgotPassword = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({
            success: false,
            message: "Podaj nazwę użytkownika"
        });
    }

    try {
        const normalizedUsername =
            normalizeUsername(username);

        const user = await User.findOne({
            username: normalizedUsername,
            isActive: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Nie znaleziono użytkownika"
            });
        }

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        const resetTokenExpires = new Date(
            Date.now() +
            RESET_TOKEN_TIME_MS
        );

        user.resetToken = resetToken;
        user.resetTokenExpires =
            resetTokenExpires;

        await user.save();

        const resetLink =
            `${config.app.frontendUrl}/reset-password/${resetToken}`

        const transporter =
            await createTransporter();

        const info = await transporter.sendMail({
            from:
                '"Ars Coloris" <noreply@arscoloris.pl>',

            to: user.email,

            subject:
                "Reset hasła Ars Coloris",

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

        console.log(
            "Preview URL:",
            previewUrl
        );

        return res.json({
            success: true,
            message:
                "Wysłano wiadomość testową",
            previewUrl
        });
    } catch (error) {
        console.error(
            "Błąd resetowania hasła:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Błąd resetowania hasła"
        });
    }
};

const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({
            success: false,
            message:
                "Brakuje tokenu lub nowego hasła"
        });
    }

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpires: {
                $gt: new Date()
            },
            isActive: true
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Token resetowania hasła jest nieprawidłowy lub wygasł"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        await user.save();

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
};

module.exports = {
    loginUser,
    forgotPassword,
    resetPassword
};