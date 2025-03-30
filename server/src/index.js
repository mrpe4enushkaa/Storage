const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./.env" });

app.use(require("cors")());
app.use(express.json());

const PORT = 3000;

const database = require("./connections/database");
const table = require("./connections/table");

async function init() {
    await database();
    await table();
}

init();

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'storage'
});

async function checkUser(username, password) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT password FROM users where username=?", [username], async (error, result) => {
            if (error) {
                console.log(error);
                return reject(false);
            }

            if (result.length > 0) {
                const hashedPassword = result[0].password;
                const match = await bcrypt.compare(password, hashedPassword);

                return resolve(match);
            } else {
                return resolve(false);
            }
        });
    });
}

async function addUser(email, username, password) {
    const hashPassword = await bcrypt.hash(password, 15);

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashPassword], (error, result) => {
            if (error) {
                return reject(false)
            }

            return resolve(true);
        });
    });
}

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;

    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json({ user: await checkUser(username, password) });
});

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;

    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json({ add: await addUser(email, username, password) });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});