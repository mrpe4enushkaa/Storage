const { rejects } = require("assert");
const fs = require("fs");
const mysql = require("mysql2");
const { resolve } = require("path");

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "storage"
});

async function table() {
    return new Promise((resolve, rejects) => {
        const sql = fs.readFileSync('./database/createTable.sql', 'utf8');
        connection.query(sql, (error, results)=>{
            if (error) {
                console.log("Error: ", error);
                rejects(error);
            }

            connection.end((error)=>{
                if(error) {
                    console.log("Error: ", error);
                    rejects(error);
                }

                resolve(results);
            });
        });
    });
}

module.exports = table;