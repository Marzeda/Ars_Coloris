const fs = require("fs");
const path = require("path");

const usersPath = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);

const getUsers = async (req, res) => {
    try {
        const data = await fs.promises.readFile(
            usersPath,
            "utf8"
        );

        const users = JSON.parse(data);

        return res.json(users);
    } catch (error) {
        console.error(
            "Błąd odczytu użytkowników:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Błąd odczytu użytkowników"
        });
    }
};

module.exports = {
    getUsers
};