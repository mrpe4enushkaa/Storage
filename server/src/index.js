require("dotenv").config({ path: "./.env" });
const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const os = require("os");
const multer = require("multer");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const database = require("./connections/database");
const table = require("./connections/table");
const { json } = require("stream/consumers");

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const salt = Date.now() + "-" + Math.round(Math.random() + 1E9);
        cb(null, salt + "-" + file.originalname)
    }
});

const upload = multer({ storage });


const rightsMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.json({ "rights": false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.data = { rights: true, decoded };

    next();
}

app.get("/api/rights", rightsMiddleware, (req, res) => {
    res.json({ "data": req.data });
});


//identification start
async function checkUser(username, password) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT id_user, password, email FROM users WHERE username = ?", [username], async (error, result) => {
            if (error) {
                console.log(error);
                return reject(false);
            }

            if (result.length > 0) {
                const hashedPassword = result[0].password;
                const match = await bcrypt.compare(password, hashedPassword);

                return resolve({ match, id: result[0].id_user, email: result[0].email });
            } else {
                return resolve({ match: false, id: null, email: null });
            }
        });
    });
}

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;
    const { match, id, email } = await checkUser(username, password);

    if (match) {
        const token = jwt.sign({ id, username, email }, SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        res.status(200).json({ "user": true });
    } else {
        res.status(401).json({ "user": false });
    }
});


async function addUser(email, username, password) {
    const hashPassword = await bcrypt.hash(password, 15);
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashPassword], (error, result) => {
            if (error) {
                return resolve({ add: false, id: null });
            }

            if (result) {
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

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;
    const { add, id } = await addUser(email, username, password);

    if (add) {
        const token = jwt.sign({ id, username, email }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        res.status(200).json({ "add": true });
    } else {
        res.status(401).json({ "add": false });
    }
});
//identification end


//profile start
app.get("/api/logout", (req, res) => {
    res.clearCookie("jwt");
    res.json({ "exit": true })
});


const getIp = () => {
    const interfaces = os.networkInterfaces();

    for (const listInterfaces of Object.values(interfaces)) {
        for (const interface of listInterfaces) {
            if (interface.family === "IPv4" && !interface.internal) {
                return interface.address;
            }
        }
    }
}

// const quickSort = (array) => {
//     if (array.length < 2) {
//         return array;
//     }

//     const pivotItem = array[0];
//     const pivot = pivotItem.uploaded;

//     const less = array.slice(1).filter(item => item.uploaded <= pivot);
//     const greater = array.slice(1).filter(item => item.uploaded > pivot);

//     return [...quickSort(less), pivotItem, ...quickSort(greater)];
// };

app.post("/api/getData", async (req, res) => {
    const { id } = req.body;

    let documents = {};
    let passwords = {};

    let response = [];

    connection.query("SELECT id_password, name, uploaded FROM passwords WHERE id_user = ?", [id], (error, result) => {
        passwords = result;

        connection.query("SELECT id_document, name, uploaded FROM documents WHERE id_user = ?", [id], (error, result) => {
            documents = result;

            documents.forEach(item => {
                item.type = 'document';
                response.push(item);
            });

            passwords.forEach(item => {
                item.type = 'password';
                response.push(item);
            });

            response.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));

            response.forEach(item => item.uploaded = new Date(item.uploaded).toLocaleDateString());

            res.json({ data: response });
        });
    });
});

app.post("/api/addDocument", upload.array("files"), (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const files = req.files;
    console.log(files)
    const urls = files.map(file => file.filename);

    const jsonUrls = JSON.stringify({ urls });

    connection.query("INSERT INTO documents (id_user, name, urls) VALUES (?, ?, ?)", [id, name, jsonUrls], (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Success");
    });
});

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString(("hex"))
    }
}

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash.iv, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final()
    ]);
    return decrypted.toString("utf8");
}

app.post("/api/addPassword", upload.none(), (req, res) => {
    const { name, id, password } = req.body;
    const encrypted = encrypt(password);

    const passwordJson = JSON.stringify({
        content: encrypted.content,
        iv: encrypted.iv
    });

    connection.query("INSERT INTO passwords (id_user, name, password) VALUES (?, ?, ?)", [id, name, passwordJson], (error, result) => {
        if (error) {
            console.error("Ошибка при вставке в базу данных:", error);
            return;
        }
        console.log("Succsess!");
    });
});
//profile end

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});