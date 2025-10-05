var express = require('express');
var router = express.Router();
const pool = require('../database/db');

router.use((req, res, next) => {
  console.log("Body recebido no middleware:", req.body);
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async function (req, res, next) {

  const {username, email, password} = req.body;

  if (!username || !email || !password ) {
    return res.status(400).json({error: "Todos os campos são obrigatórios"});
  }

  try{

    console.log("Recebido para cadastro:", req.body);

    const[result] = await pool.execute (
      "insert into users(username, email, password) values (?,?,?)",
      [username,email,password]
    );

    console.log("cadastro confirmado! ID inserido:", result.insertId);
    
    res.status(201).json({message: "Usuário cadastrado com sucesso!", userId: result.insertId});

  }catch(error){
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({error: "Erro ao cadastrar usuário"});
  }
});

module.exports = router;
