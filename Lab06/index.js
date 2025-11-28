var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
alunosPath = path.join(__dirname, "alunos.json");

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function lerAlunos() {
    return JSON.parse(fs.readFileSync(alunosPath, 'utf8'));
}
function salvarAlunos(lista) {
    fs.writeFileSync(alunosPath, JSON.stringify(lista, null, 2));
}

//adiciona novo aluno
app.post('/api/aluno', (req, res) => {
    const { nome, numero, morada } = req.body;
    if (!nome || !numero) {
        return res.status(400).send('Dados incompletos.');
    }
    const alunos = lerAlunos();
    alunos.push({ nome, numero, morada });
    salvarAlunos(alunos);
    res.status(201).send('Aluno criado com sucesso.');
});

//altera aluno existente
app.put('/api/aluno/:numero', (req, res) => {
    const numeroExistente = req.params.numero;
    const { nome, morada } = req.body;
    if (!nome) {
        return res.status(400).send('Dados incompletos');
    }
    const alunos = lerAlunos();
    const index = alunos.findIndex(a => a.numero == numeroExistente);
    if (index === -1)
        return res.status(404).send('Aluno não encontrado.');
    alunos[index] = { nome, numero: numeroExistente, morada };
    const aluno = alunos[index];
    salvarAlunos(alunos);
    res.status(200).json(aluno);
});

//retorna todos os alunos
app.get('/api/aluno', (req, res) => {
    const alunos = lerAlunos();
    res.status(200).json(alunos);
});

//retorna aluno por número
app.get('/api/aluno/:numero', (req, res) => {
    const numero = req.params.numero;
    const alunos = lerAlunos();
    let aluno = alunos.find(a => a.numero == numero);
    if (aluno) {
        res.status(200).json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

//deleta aluno por número
app.delete('/api/aluno/:numero', (req, res) => {
    const numero = req.params.numero;
    const alunos = lerAlunos();
    const index = alunos.findIndex(a => a.numero === numero);
    if (index === -1) {
        return res.status(404).send('Aluno não encontrado.');
    }
    alunos.splice(index, 1);
    salvarAlunos(alunos);
    res.status(204).send();
});


//deleta todos os alunos
app.delete('/api/aluno', (req, res) => {
    salvarAlunos([]);
    res.status(204).send();
});

//Rotas forms
var rotas = require('./routes/rotas-forms.js');
app.use('/', rotas);

//rota de erro
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/erro-not-found.html');
});

app.listen(8081);

