const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "storage"
});

async function table() {
    const createUsers = new Promise((resolve, reject) => {
        const sql = fs.readFileSync('./database/createUsersTable.sql', 'utf8');
        connection.query(sql, (error) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
        });
    });

    const createDocuments = new Promise((resolve, reject) => {
        const sql = fs.readFileSync("./database/createDocumentsTable.sql", "utf8");
        connection.query(sql, (error) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
        })
    });

    const createPasswords = new Promise((resolve, reject) => {
        const sql = fs.readFileSync("./database/createPasswordsTable.sql", "utf8");
        connection.query(sql, (error) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
        })
    });

    const createEntries = new Promise((resolve, reject) => {
        const sql = fs.readFileSync("./database/createEntriesTable.sql", "utf8");
        connection.query(sql, (error) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
        })
    });

    const results = await Promise.all([createUsers, createDocuments, createPasswords, createEntries]);

    connection.end((error) => {
        if (error) {
            console.log("Error: ", error);
            reject(error);
        }

        resolve(results);

        return results;
    });
}

module.exports = table;