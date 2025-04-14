const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY

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
        connection.query("SELECT id_user, password FROM users WHERE username = ?", [username], async (error, result) => {
            if (error) {
                console.log(error);
                return reject(false);
            }

            if (result.length > 0) {
                const hashedPassword = result[0].password;
                const match = await bcrypt.compare(password, hashedPassword);

                return resolve({ match, id: result[0].id_user });
            } else {
                return resolve({ match: false, id: null });
            }
        });
    });
}

async function addUser(email, username, password) {
    const hashPassword = await bcrypt.hash(password, 15);
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashPassword], (error, result) => {
            if (error) {
                return resolve({ add: false, id: null });
            }

            if(result){
                connection.query("SELECT id_user FROM users WHERE email = ? AND username = ? AND password = ?", [email, username, hashPassword], (error, result) => {
                    if (error) {
                        return reject({ add: false, id: null });
                    }

                    return resolve({ add: true, id: result[0].id_user });
                });
            }
        });
    });
}

const rightsMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.json({ rights: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.data = { rights: true, decoded };

    next();
}

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;

    const { match, id } = await checkUser(username, password);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (match) {
        const token = jwt.sign({ id, username }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000
        });

        res.status(200).json({ user: true });
    } else {
        res.status(401).json({ user: false });
    }
});

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;

    await new Promise(resolve => setTimeout(resolve, 500));

    const { add, id } = await addUser(email, username, password);

    if (add) {
        const token = jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000
        });

        res.status(200).json({ add: true });
    } else {
        res.status(401).json({ add: false });
    }
});

app.get("/api/rights", rightsMiddleware, (req, res) => {
    res.json({ data: req.data });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});