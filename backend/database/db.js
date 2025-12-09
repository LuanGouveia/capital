// db.js
require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const promisePool = pool.promise();

promisePool
    .getConnection()
    .then((connection) => {
        console.log("✅ Sucesso: Conectado ao TiDB!");
        connection.release();
    })
    .catch((err) => {
        console.error("❌ Erro de conexão:", err.code);
        console.error("Mensagem:", err.message);
    });

module.exports = promisePool;
