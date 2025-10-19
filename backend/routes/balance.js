var express = require("express");
var router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "my_JWT_SECRET", (err, user) => {
        if (err) {
            console.error("Token inválido:", err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

router.post("/addValue", authenticateToken, async function (req, res, next) {
    const userId = req.user.userId;

    const { profitorexpense, value, expenseType, category, desc } = req.body;

    if (!userId || value == null || !expenseType || !category) {
        console.log(userId, profitorexpense, value, expenseType, category, desc);
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        console.log("Recebido para adicionar valor:", userId, req.body);

        const [result] = await pool.execute("insert into balance(userId, profitOrExpense, expensetype, category, value, description) values (?,?,?,?,?,?)", [
            userId,
            profitorexpense,
            expenseType,
            category,
            value,
            desc,
        ]);

        res.status(201).json({ message: "Valor adicionado com sucesso!", entryId: result.insertId });
    } catch (error) {
        console.error("Erro ao adicionar valor:", error);

        res.status(500).json({ error: "Erro ao adicionar valor" });
    }
});

router.get("/getValues", authenticateToken, async function (req, res, next) {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    try {
        const [rows] = await pool.execute("SELECT * FROM balance WHERE userId = ?", [userId]);

        const combineddata = [];
        rows.forEach((row) => {
            combineddata.push({
                profitorexpense: row.profitOrExpense,
                value: row.profitOrExpense == "profit" ? parseFloat(row.value) : parseFloat(row.value) * -1,
            });
        });

        const user_infos = {
            userId: req.user.userId,
            combineddata,
        };

        console.log("Valores buscados para o usuário:", user_infos);

        res.status(200).json(user_infos);
    } catch (error) {
        console.error("Erro ao buscar valores:", error);
        res.status(500).json({ error: "Erro ao buscar valores" });
    }
});

module.exports = router;
