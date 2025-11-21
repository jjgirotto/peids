var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
const fs = require('fs');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Views');

app.use(express.static(__dirname + '/public'));

const menu = [
    { href: "/", name: "Home" },
    { href: "/form-get-aluno", name: "Formulário GET" },
    { href: "/form-post-aluno", name: "Formulário POST" },
    { href: "/lista-aluno", name: "Lista Alunos" }
];

app.use((req, res, next) => {
    res.locals.menu = menu;
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.render('home', {
        title: 'Express JS',
        bem_vindo: 'Bem vindo!',
        nome: 'Nome: Juliana Girotto Leite',
        numero: 'Nº de aluno: 2025116166',
        disc: 'Disciplina: Programação e Integração de Serviço'
    })
});

app.get('/form-get-aluno', function(req, res) {
    res.render('form-get-aluno', {
        title: 'Formulário',
        form: 'Formulário',
        method: 'GET',
        action: '/processar-form-get-aluno',
        campos: [
            { label: 'Número:', type: 'number', name: 'numero' },
            { label: 'Nome:', type: 'text', name: 'nome' },
            { label: 'Morada:', type: 'text', name: 'morada' }
        ],
        botao: 'ENVIAR',
        btype: 'submit'
    });
});

app.get('/form-post-aluno', function(req, res) {
    res.render('form-post-aluno', {
        title: 'Formulário',
        form: 'Formulário',
        method: 'POST',
        action: '/processar-form-post-aluno',
        campos: [
            { label: 'Número:', type: 'number', name: 'numero' },
            { label: 'Nome:', type: 'text', name: 'nome' },
            { label: 'Morada:', type: 'text', name: 'morada' }
        ],
        botao: 'ENVIAR',
        btype: 'submit'
    });
});

app.get('/lista-aluno', function(req, res) {
    let alunos = JSON.parse(fs.readFileSync('./alunos.json', 'utf8'));
    res.render('lista-aluno', {
        title: 'Lista Alunos JSON',
        labelNome: 'Nome',
        labelMorada: 'Morada',
        alunos: alunos
    });
});

//Rotas forms
var rotas = require('./routes/rotas-forms.js');
app.use('/', rotas);

//rota de erro
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/erro-not-found.html');
});

app.listen(8081);

