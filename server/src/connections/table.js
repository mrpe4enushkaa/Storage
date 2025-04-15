const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "storage"
});

async function table() {
    return new Promise((resolve, reject) => {
        const sql = fs.readFileSync('./database/createTable.sql', 'utf8');
        connection.query(sql, (error, results)=>{
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }

            connection.end((error)=>{
                if(error) {
                    console.log("Error: ", error);
                    reject(error);
                }

                resolve(results);
            });
        });
    });
}

module.exports = table;