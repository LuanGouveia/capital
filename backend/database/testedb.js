const pool = require("./db.js");

async function testeconnection() {
    try{
        const[rows] = await pool.query("select 1 + 1 as result");
        console.log("conexão bem sucedida! resultado: ", rows[0].result)
    }catch (err){
        console.error("Erro ao conectar no banco:", err);
    }
}

testeconnection();