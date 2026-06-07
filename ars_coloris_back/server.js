const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Uruchomiono server. Witaj w Ars Coloris API! by Aga Szelech");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});