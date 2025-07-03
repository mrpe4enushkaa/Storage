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
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const database = require("./connections/database");
const table = require("./connections/table");
const path = require("path");

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
        return res.json({ data: { rights: false } });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const ip = getIp();

    connection.query("SELECT IP FROM ips WHERE ID_USER = ?", [decoded.id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        for (const item of result) {
            if (item.IP === ip) {
                return res.json({ data: { rights: false } });
            }
        }

        req.data = { rights: true, decoded };
        next();
    });
}

app.get("/api/rights", rightsMiddleware, (req, res) => {
    res.json({ "data": req.data });
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

//identification start
async function checkUser(username, password, ip) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT id_user, password, email, avatar FROM users WHERE username = ?",
            [username],
            async (error, result) => {
                if (error) {
                    console.log(error);
                    return reject(false);
                }

                if (result.length === 0) {
                    return resolve({ match: false, id: null, email: null, avatar: null });
                }

                const userId = result[0].id_user;
                const hashedPassword = result[0].password;

                const matchPassword = await bcrypt.compare(password, hashedPassword);

                if (!matchPassword) {
                    return resolve({ match: false, id: null, email: null, avatar: null });
                }

                connection.query(
                    "SELECT IP FROM ips WHERE ID_USER = ?",
                    [userId],
                    (ipError, ipResult) => {
                        if (ipError) {
                            console.log(ipError);
                            return reject(false);
                        }

                        const ipExists = ipResult.some(item => item.IP === ip);

                        if (ipExists) {
                            return resolve({ match: false, id: null, email: null, avatar: null });
                        } else {
                            return resolve({ match: true, id: result[0].id_user, email: result[0].email, avatar: result[0].avatar });
                        }
                    }
                );
            }
        );
    });
}

const addEntry = async (id) => {
    const ip = getIp();

    connection.query("INSERT INTO entries (ID_USER, IP_ADDRESSES) VALUES (?, ?)", [id, ip], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

app.post("/api/checkUser", async (req, res) => {
    const { username, password } = req.body;
    const { match, id, email, avatar } = await checkUser(username, password, getIp());

    if (match) {
        const token = jwt.sign({ id, username, email, avatar }, SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        await addEntry(id);

        res.status(200).json({ "user": true });
    } else {
        res.status(401).json({ "user": false });
    }
});


async function addUser(email, username, password) {
    const hashPassword = await bcrypt.hash(password, 15);

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users (email, username, password, avatar) VALUES (?, ?, ?, 'none')", [email, username, hashPassword], (error, result) => {
            if (error) {
                console.log(error)
                return resolve({ add: false, id: null });
            }

            if (result) {
                connection.query("SELECT id_user, avatar FROM users WHERE email = ? AND username = ? AND password = ?", [email, username, hashPassword], (error, result) => {
                    if (error) {
                        return reject({ add: false, id: null });
                    }

                    addEntry(result[0].id_user);

                    return resolve({ add: true, id: result[0].id_user, avatar: result[0].avatar });
                });
            }
        });
    });
}

app.post("/api/addUser", async (req, res) => {
    const { email, username, password } = req.body;
    const { add, id, avatar } = await addUser(email, username, password);

    if (add) {
        const token = jwt.sign({ id, username, email, avatar }, process.env.SECRET_KEY, { expiresIn: "24h" });

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

            res.json({
                "data": response,
                "passwords_length": passwords.length,
                "documents_length": documents.length,
            });
        });
    });
});

app.post("/api/addDocument", upload.array("files"), (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const files = req.files;

    const urls = files.map(file => file.filename);

    const jsonUrls = JSON.stringify({ urls });

    connection.query("INSERT INTO documents (id_user, name, urls) VALUES (?, ?, ?)", [id, name, jsonUrls], (error) => {
        if (error) {
            console.log(error);
            return;
        }

        const text = `The document «${name}» has been added`;

        connection.query("INSERT INTO activities (id_user, text) VALUES (?, ?)", [id, text], (err, result) => {
            if (err) {
                console.error("Ошибка при вставке в базу данных:", err);
                return;
            }

            if (result) {
                res.json({ result: true });
            }
        });
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

        const text = `The password «${name}» has been added`;

        connection.query("INSERT INTO activities (id_user, text) VALUES (?, ?)", [id, text], (err, result) => {
            if (err) {
                console.error("Ошибка при вставке в базу данных:", err);
                return;
            }

            if (result) {
                res.json({ result: true });
            }
        });
    });
});

app.post("/api/deleteAccount", (req, res) => {
    const user_id = req.body.id;

    connection.query("DELETE FROM users WHERE ID_USER = ?", [user_id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.clearCookie("jwt");
        res.json({ "delete": true });
    });
});

app.post("/api/getEntries", (req, res) => {
    const { id } = req.body;

    connection.query("SELECT IP_ADDRESSES, UPLOADED FROM entries WHERE ID_USER = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json({ "entries": result });
    });
});

app.post("/api/getActivities", (req, res) => {
    const { id } = req.body;

    connection.query("SELECT TEXT, UPLOADED FROM activities WHERE ID_USER = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json({ "activities": result });
    });
});

app.post("/api/getBlocks", (req, res) => {
    const { id } = req.body;

    connection.query("SELECT * FROM ips WHERE ID_USER = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json(result);
    });
});

app.post("/api/addBlock", (req, res) => {
    const { ip, id } = req.body;

    connection.query("INSERT INTO ips (IP, ID_USER) VALUES (?, ?)", [ip, id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json({ "message": "success" });
    });
});

app.delete("/api/deleteBlock", (req, res) => {
    const { id_user, id_ip } = req.body;

    connection.query("DELETE FROM ips WHERE ID_USER = ? AND ID_IP = ?",
        [id_user, id_ip],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            res.json({ "message": "success" });
        });
});

app.post("/api/editUser/username", (req, res) => {
    const { id_user, new_username } = req.body;

    connection.query("UPDATE users SET username = ? WHERE id_user = ?", [new_username, id_user], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        const { email, id, avatar } = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);

        res.clearCookie("jwt");

        const token = jwt.sign({ id, username: new_username, email, avatar }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        res.json({ "message": "success" });
    });
});

app.post("/api/editUser/email", (req, res) => {
    const { id_user, new_email } = req.body;

    connection.query("UPDATE users SET email = ? WHERE id_user = ?", [new_email, id_user], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        const { username, id, avatar } = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);

        res.clearCookie("jwt");

        const token = jwt.sign({ id, username, email: new_email, avatar }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        res.json({ "message": "success" });
    });
});

app.post("/api/editUser/password", async (req, res) => {
    const { id_user, new_password } = req.body;
    const hash = await bcrypt.hash(new_password, 15)

    connection.query("UPDATE users SET password = ? WHERE id_user = ?", [hash, id_user], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.clearCookie("jwt");
        res.json({ "message": "success" });
    });
});

app.post("/api/editUser/avatar", upload.single("file"), async (req, res) => {
    const { id_user } = req.body;
    const file = req.file;
    const url = file.filename;

    connection.query("UPDATE users SET avatar = ? WHERE id_user = ?", [url, id_user], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        const { username, id, email, avatar } = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);

        const oldAvatar = path.basename(avatar);
        const oldFile = path.join(__dirname, "uploads", oldAvatar);

        if (oldFile) {
            fs.unlink(oldFile, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        }

        res.clearCookie("jwt");

        const baseUrl = `http://localhost:3000/avatar/${url}`;

        const token = jwt.sign({ id, username, email, avatar: baseUrl }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000 * 24
        });

        res.json({ "message": "success" });
    });
});

app.get("/avatar/:filename", rightsMiddleware, (req, res) => {
    const id_user = req.data.decoded.id;
    const filename = req.params.filename;
    const uploadsDir = path.join(__dirname, "uploads");
    const requestedPath = path.resolve(uploadsDir, filename);

    if (!requestedPath.startsWith(uploadsDir)) {
        return res.status(400).send("Некорректный путь");
    }

    connection.query("SELECT avatar FROM users WHERE id_user = ?", [id_user], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Ошибка сервера");
        }

        if (!result.length || result[0].avatar !== filename) {
            return res.status(403).send("Доступ запрещён");
        }

        if (!fs.existsSync(requestedPath)) {
            return res.status(404).send("Файл не найден");
        }

        const absolutePath = path.join(__dirname, "uploads", filename);

        res.sendFile(absolutePath);
    });
});

//profile end

//item start

app.post("/api/:type/:id", (req, res) => {
    const { type, id } = req.params;
    const { id_user } = req.body;

    const getPassword = async () => {
        connection.query("SELECT * FROM PASSWORDS WHERE id_password = ? AND id_user = ?", [id, id_user], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.length === 0) {
                res.json({ "error": true });
                return;
            }

            const name = result[0].NAME;
            const hash = result[0].PASSWORD;
            const id_password = result[0].ID_PASSWORD;

            const password = decrypt(hash);

            res.json({ "type": "password", name, "password": password, "error": false, id_password });
        })
    }

    const getDocuments = async () => {
        connection.query(
            "SELECT * FROM DOCUMENTS WHERE id_document = ? AND id_user = ?",
            [id, id_user],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: true });
                }

                if (result.length === 0) {
                    return res.json({ error: true });
                }

                const name = result[0].NAME;
                const urls = result[0].URLS.urls;
                const id_document = result[0].ID_DOCUMENT;

                const baseUrl = "http://localhost:3000/files";
                const fileLinks = urls.map(name => `${baseUrl}/${name}`);

                res.json({ "type": "document", name, error: false, files: fileLinks, id_document });
            }
        );
    };

    switch (type) {
        case "password":
            getPassword();
            break;
        case "document":
            getDocuments();
            break;
        default:
            res.json({ "error": true });
            return;
    }
});

app.get("/files/:filename", rightsMiddleware, (req, res) => {
    const id_user = req.data.decoded.id;
    const filename = req.params.filename;
    const uploadsDir = path.join(__dirname, "uploads");
    const requestedPath = path.join(uploadsDir, filename);

    if (!requestedPath.startsWith(uploadsDir)) {
        return res.status(400).send("Некорректный путь");
    }

    connection.query("SELECT urls FROM DOCUMENTS WHERE id_user = ?", [id_user], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Ошибка сервера");
        }

        const coincidence = result.some(url =>
            url.urls.urls.includes(filename)
        );

        if (!coincidence) {
            return res.status(403).json({ rights: false });
        }

        if (!fs.existsSync(requestedPath)) {
            return res.status(404).send("Файл не найден");
        }

        res.download(requestedPath);
    });
});

app.delete("/api/deleteFile", (req, res) => {
    const { user_id, id_file, type, name } = req.body;

    const text = `The ${type} «${name}» has been deleted`;

    const deleteDocument = () => {
        connection.query("DELETE FROM documents WHERE ID_DOCUMENT = ? AND ID_USER = ?", [id_file, user_id], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            connection.query("INSERT INTO activities (id_user, text) VALUES (?, ?)", [user_id, text], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                res.json({ "result": true });
            })
        });
    }

    const deletePassword = () => {
        connection.query("DELETE FROM passwords WHERE ID_PASSWORD = ? AND ID_USER = ?", [id_file, user_id], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            connection.query("INSERT INTO activities (id_user, text) VALUES (?, ?)", [user_id, text], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                res.json({ "result": true });
            })
        });
    }

    switch (type) {
        case "document":
            deleteDocument();
            break;
        case "password":
            deletePassword();
            break;
        default:
            res.json({ "error": true });
            return;
    }
});

//item end


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});