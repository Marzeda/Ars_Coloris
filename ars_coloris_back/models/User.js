const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        legacyId: {
            type: Number,
            unique: true,
            sparse: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "artist"],
            required: true
        },

        failedLoginAttempts: {
            type: Number,
            default: 0,
            min: 0
        },

        lockUntil: {
            type: Date,
            default: null
        },

        resetToken: {
            type: String,
            default: null
        },

        resetTokenExpires: {
            type: Date,
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;