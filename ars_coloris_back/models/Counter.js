const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        seq: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        collection: "counters",
        versionKey: false
    }
);

module.exports = mongoose.model(
    "Counter",
    counterSchema
);