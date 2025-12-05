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

        res.status(200).json(user_infos);
    } catch (error) {
        console.error("Erro ao buscar valores:", error);
        res.status(500).json({ error: "Erro ao buscar valores" });
    }
});

router.get("/transactions", authenticateToken, async function (req, res) {
    const userId = req.user?.userId;

    try {
        const [rows] = await pool.execute("SELECT * FROM balance WHERE userId = ? ORDER BY created_at DESC", [userId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar valores:", error);
        res.status(500).json({ error: "Erro ao buscar valores" });
    }
});

router.delete("/delete/:id", authenticateToken, async function (req, res) {
    const transactionId = req.params.id;
    const userId = req.user.userId;

    try {
        const [result] = await pool.execute("DELETE FROM balance WHERE id = ? AND userId = ?", [transactionId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Registro não encontrado ou sem permissão." });
        }

        console.log("SUCESSO: Item deletado.");
        res.json({ message: "Transação deletada com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar:", error);
        res.status(500).json({ error: "Erro ao deletar transação" });
    }
});

router.put("/update/:id", authenticateToken, async function (req, res) {
    const transactionId = req.params.id;
    const userId = req.user.userId;

    const { category, value, description, expenseType, profitOrExpense } = req.body;

    try {
        const [result] = await pool.execute(
            `UPDATE balance 
            SET category = ?, 
            value = ?, 
            description = ?, 
            expenseType = ?,
            profitOrExpense = ?
            WHERE id = ? AND userId = ?`,
            [category, value, description, expenseType, profitOrExpense, transactionId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Registro não encontrado ou sem permissão." });
        }

        return res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: "Erro ao atualizar transação" });
    }
});

module.exports = router;
