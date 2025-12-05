var express = require("express");
var router = express.Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async function (req, res, next) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Recebido para cadastro:", req.body);

        const [result] = await pool.execute("insert into users(username, email, password) values (?,?,?)", [username, email, hashedPassword]);

        console.log("cadastro confirmado! ID inserido:", result.insertId);

        res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId: result.insertId });
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
});

router.post("/login", async function (req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        const [rows] = await pool.execute("select * from users where email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = jwt.sign({ userId: user.userId, username: user.username }, "my_JWT_SECRET", { expiresIn: "12h" });

        res.status(200).json({
            message: "Login bem-sucedido",
            token,
            username: user.username,
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

module.exports = router;
