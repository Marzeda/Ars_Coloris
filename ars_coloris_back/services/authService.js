const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config/appConfig");

const ServiceError = require(
    "../errors/ServiceError"
);

const {
    sendPasswordResetEmail
} = require("./emailService");

const MAX_LOGIN_ATTEMPTS = 3;

const ACCOUNT_LOCK_TIME_MS =
    2 * 60 * 60 * 1000;

const RESET_TOKEN_TIME_MS =
    30 * 60 * 1000;

const normalizeUsername = (username) => {
    return String(username)
        .trim()
        .toLowerCase();
};

const login = async ({
                         username,
                         password
                     }) => {
    if (!username || !password) {
        throw new ServiceError(
            "Podaj login i hasło",
            400
        );
    }

    const normalizedUsername =
        normalizeUsername(username);

    const user = await User.findOne({
        username: normalizedUsername,
        isActive: true
    });

    if (!user) {
        throw new ServiceError(
            "Nieprawidłowy login lub hasło",
            401
        );
    }

    const now = Date.now();

    if (
        user.lockUntil &&
        user.lockUntil.getTime() > now
    ) {
        const remainingMinutes =
            Math.ceil(
                (
                    user.lockUntil.getTime() -
                    now
                ) / 60000
            );

        throw new ServiceError(
            `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`,
            403
        );
    }

    if (
        user.lockUntil &&
        user.lockUntil.getTime() <= now
    ) {
        user.lockUntil = null;
        user.failedLoginAttempts = 0;
    }

    const passwordMatches =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!passwordMatches) {
        user.failedLoginAttempts += 1;

        if (
            user.failedLoginAttempts >=
            MAX_LOGIN_ATTEMPTS
        ) {
            user.lockUntil = new Date(
                Date.now() +
                ACCOUNT_LOCK_TIME_MS
            );

            user.failedLoginAttempts = 0;
        }

        await user.save();

        throw new ServiceError(
            "Nieprawidłowy login lub hasło",
            401
        );
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    const userId =
        user.legacyId ||
        user._id.toString();

    const token = jwt.sign(
        {
            id: userId,
            username: user.username,
            role: user.role
        },
        config.jwt.secret,
        {
            expiresIn:
            config.jwt.expiresIn
        }
    );

    return {
        success: true,
        token,
        user: {
            id: userId,
            username: user.username,
            role: user.role
        }
    };
};

const forgotPassword = async ({
                                  username
                              }) => {
    if (!username) {
        throw new ServiceError(
            "Podaj nazwę użytkownika",
            400
        );
    }

    const normalizedUsername =
        normalizeUsername(username);

    const user = await User.findOne({
        username: normalizedUsername,
        isActive: true
    });

    if (!user) {
        throw new ServiceError(
            "Nie znaleziono użytkownika",
            404
        );
    }

    const resetToken =
        crypto
            .randomBytes(32)
            .toString("hex");

    const resetTokenExpires =
        new Date(
            Date.now() +
            RESET_TOKEN_TIME_MS
        );

    user.resetToken = resetToken;
    user.resetTokenExpires =
        resetTokenExpires;

    await user.save();

    const resetLink =
        `${config.app.frontendUrl}` +
        `/reset-password/${resetToken}`;

    const { previewUrl } =
        await sendPasswordResetEmail(
            user.email,
            resetLink
        );

    console.log(
        "Preview URL:",
        previewUrl
    );

    return {
        success: true,
        message:
            "Wysłano wiadomość testową",
        previewUrl
    };
};

const resetPassword = async ({
                                 token,
                                 password
                             }) => {
    if (!token || !password) {
        throw new ServiceError(
            "Brakuje tokenu lub nowego hasła",
            400
        );
    }

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpires: {
            $gt: new Date()
        },
        isActive: true
    });

    if (!user) {
        throw new ServiceError(
            "Token resetowania hasła jest nieprawidłowy lub wygasł",
            400
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    return {
        success: true,
        message:
            "Hasło zostało zmienione"
    };
};

module.exports = {
    login,
    forgotPassword,
    resetPassword
};