const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config/appConfig");
const ServiceError = require(
    "../errors/ServiceError"
);

const MAX_LOGIN_ATTEMPTS = 3;
const ACCOUNT_LOCK_TIME_MS =
    2 * 60 * 60 * 1000;

const normalizeUsername = (username) => {
    return String(username)
        .trim()
        .toLowerCase();
};

const login = async ({ username, password }) => {
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

    const now = new Date();

    if (
        user.lockUntil &&
        user.lockUntil.getTime() >
        now.getTime()
    ) {
        const remainingMinutes = Math.ceil(
            (
                user.lockUntil.getTime() -
                now.getTime()
            ) / 60000
        );

        throw new ServiceError(
            `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`,
            403
        );
    }

    if (
        user.lockUntil &&
        user.lockUntil.getTime() <=
        now.getTime()
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

module.exports = {
    login
};