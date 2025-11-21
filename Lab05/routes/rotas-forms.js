var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const alunosPath = path.join(__dirname, '../alunos.json');
function lerAlunos() {
    return JSON.parse(fs.readFileSync(alunosPath, 'utf8'));
}
function salvarAlunos(lista) {
    fs.writeFileSync(alunosPath, JSON.stringify(lista, null, 2));
}

//FORMULÁRIO GET
//Rota que será chamada quando se clicar no botão de submit do formulário GET
router.get('/processar-form-get-aluno', (req, res) => {
    var aluno = {
        numero:req.query.numero, 
        nome:req.query.nome, //com o GET os parâmetros vêm por querystring
        morada:req.query.morada || "Não definida"
    };
    console.log(aluno);
    let alunos = lerAlunos();
    alunos.push(aluno);
    salvarAlunos(alunos);
    res.json(aluno);
});

//FORMULÁRIO POST
//Rota que será chamada quando se clicar no botão de submit do formulário POST
router.post('/processar-form-post-aluno', (req, res) => {
    var aluno = {
        numero:req.body.numero, 
        nome:req.body.nome, // com o POST os parâmetros vêm por body
        morada:req.body.morada || "Não definida"
    };
    console.log(aluno);
    let alunos = lerAlunos();
    alunos.push(aluno);
    salvarAlunos(alunos);
    res.json(aluno);
});

//exportação do módulo
module.exports = router;