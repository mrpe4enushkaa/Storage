const express = require("express");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(require("cors")());

app.get("/api/checkUser", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    res.status(200).json({ user: true });
});

app.listen(5000, () => {
    console.log("http://localhost:5000");
});