const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

async function database() {
    return new Promise((resolve, reject) => {
        const sql = fs.readFileSync("./database/createDatabase.sql", "utf8");

        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Error: ", error);
                return reject(error);
            }

            connection.end((error) => {
                if (error) {
                    console.error("Error: ", error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}

module.exports = database;