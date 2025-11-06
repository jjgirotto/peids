var express = require('express');
var router = express.Router();
var autenticacao = require('./auth.js');

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
router.post('/processar-form-post-aluno', autenticacao, (req, res) => {
    var response = {
        numero:req.body.numero, 
        nome:req.body.nome, // com o POST os parâmetros vêm por body
        morada:req.body.morada || "Não definida",
        data: req.body.data
};
console.log(response);
res.send(JSON.stringify(response));
});

// Retornar pedidos falhados
var fs = require('fs');
var path = require('path');
var failedRequests = path.join(__dirname, '../failedRequests.json');

router.get('/failedRequests', (req, res) => {
    //parâmetro orderBy
    const orderBy = (req.query.orderBy || 'desc');
    let falhas = JSON.parse(fs.readFileSync(failedRequests, 'utf-8'));
    falhas.sort((primeiro, segundo) => {
        const dataPrimeiro = new Date(primeiro.data);
        const dataSegundo = new Date(segundo.data);
        if (orderBy === 'asc') {
            return dataPrimeiro - dataSegundo; // mais antigo vem primeiro
        } else {
            return dataSegundo - dataPrimeiro; // mais novo vem primeiro
        }
    });
    res.json(falhas);
});


//exportação do módulo
module.exports = router;