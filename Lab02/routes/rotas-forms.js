var express = require('express');
var router = express.Router();

//FORMULÁRIO GET
//Rota que será chamada quando se clicar no botão de submit do formulário GET
router.get('/processar-form-get-aluno', (req, res) => {
    var response = {
        numero:req.query.numero, 
        nome:req.query.nome, //com o GET os parâmetros vêm por querystring
        morada:req.query.morada || "Não definida"
};
console.log(response);
res.send(JSON.stringify(response));
});

//FORMULÁRIO POST
//Rota que será chamada quando se clicar no botão de submit do formulário POST
router.use(express.urlencoded()); //para fazer o parse do body
router.post('/processar-form-post-aluno', (req, res) => {
    var response = {
        numero:req.body.numero, 
        nome:req.body.nome, // com o POST os parâmetros vêm por body
        morada:req.body.morada || "Não definida"
};
console.log(response);
res.send(JSON.stringify(response));
});


//exportação do módulo
module.exports = router;