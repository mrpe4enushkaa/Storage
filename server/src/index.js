const express = require("express");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(require("cors")());
app.use(express.json());

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    res.status(200).json({ user: true });
});

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;
    console.log(`email: ${email}, username: ${username}, password: ${password}`);
    //add the check about data from the frontend 
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.status(200).json({ add: false });
});

app.listen(1000, () => {
    console.log("http://localhost:1000");
});