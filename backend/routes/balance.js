var express = require("express");
var router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403);

        req.user = user;
        next();

    });
}

router.post("/addValue", authenticateToken, async function (req, res, next) {

    const userId = req.user.userId;
    const { profitorexpense, value, expenseType, category, desc } = req.body;

    if (!userId || profitorexpense == null || value == null || !expenseType || !category) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    } 

    try {

        console.log("Recebido para adicionar valor:", req.body);

        const [result] = await pool.execute(
            "insert into balance(userid, profitorexpense, form, category, value, descricao) values (?,?,?,?,?,?)",
            [userId, profitorexpense, expenseType, category, value, desc]
        );

        res.status(201).json({ message: "Valor adicionado com sucesso!", entryId: result.insertId });
        
    }catch (error) {
        
        console.error("Erro ao adicionar valor:", error);

        res.status(500).json({ error: "Erro ao adicionar valor" });

    }
});

module.exports = router;