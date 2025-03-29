const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });

const fs = require("fs");
const mysql = require("mysql2");

app.use(require("cors")());
app.use(express.json());

const createConnection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

function createDb() {
    const sql = fs.readFileSync('./database/createDatabase.sql', 'utf8');
    createConnection.query(sql);
    createConnection.end();
}

createDb();

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "storage"
});

function createTable() {
    const sql = fs.readFileSync('./database/createTable.sql', 'utf8');
    connection.query(sql);
}

createTable();

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    res.status(200).json({ user: true });
});

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;
    console.log(`email: ${email}, username: ${username}, password: ${password}`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    res.status(200).json({ add: false });
});

app.listen(1000, () => {
    console.log("🚀 Сервер запущен на http://localhost:1000");
});