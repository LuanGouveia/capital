var express = require('express');
var router = express.Router();
const pool = require('../database/db');

router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/cadastrar',async function (re, res, next) {
  const {username, email, passsword} = req.body;

  try{
    const[result] = await pool.execute (
      "insert into users(username, email, password) values (?,?,?)",
      [username,email,passsword]
    );

    console.log("cadastro confirmado! is inserido:", result.insertId);
    res.status(201).json({message: "Usuário cadastrado com sucesso!", userId: result.userId});

  }catch(error){
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({error: "Erro ao cadastrar usuário"});
  }
});

module.exports = router;
