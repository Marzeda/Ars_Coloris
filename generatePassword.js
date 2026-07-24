const bcrypt = require("bcryptjs");

async function generate() {
    const password = "Aga2026!";
    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
}

generate();