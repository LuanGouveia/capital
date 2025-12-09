var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.json({
        status: "Sucesso",
        message: "API do Capital rodando perfeitamente!",
        database: "Conectado",
    });
});

module.exports = router;
