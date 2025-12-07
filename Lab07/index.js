var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var db = require('./config/db');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Views');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const menu = [
    { href: "/", name: "Home" },
    { href: "/form-aluno", name: "Formulário" },
    { href: "/lista-aluno", name: "Lista Alunos" }
];

app.use((req, res, next) => {
    res.locals.menu = menu;
    next();
});

app.get('/', function (req, res) {
    res.render('home', {
        title: 'Express JS',
        bem_vindo: 'Bem vindo!',
        nome: 'Nome: Juliana Girotto Leite',
        numero: 'Nº de aluno: 2025116166',
        disc: 'Disciplina: Programação e Integração de Serviço'
    })
});

app.get('/form-aluno', function(req, res) {
    res.render('form-aluno', {
        title: 'Formulário',
        form: 'Formulário',
        method: 'POST',
        action: '/processar-aluno',
        campos: [
            { label: 'Número:', type: 'number', name: 'numero' },
            { label: 'Nome:', type: 'text', name: 'nome' },
            { label: 'Morada:', type: 'text', name: 'morada' }
        ],
        botao: 'ENVIAR',
        btype: 'submit'
    });
});

//post
app.post('/processar-aluno', (req, res) => {
    const { numero, nome, morada } = req.body;
    if (!numero || !nome) {
        return res.status(400).send("Número e nome são obrigatórios");
    }
    const moradaFinal = morada || "Não definida";
    const sql = "INSERT INTO aluno (numero, nome, morada) VALUES (?, ?, ?)";
    db.query(sql, [numero, nome, moradaFinal], (err, result) => {
        if (err) {
            console.log("ERRO SQL:", err);
            return res.status(500).send("Erro ao inserir aluno");
        }
        res.redirect('/lista-aluno');
    });
});

// Lista alunos
app.get('/lista-aluno', (req, res) => {
    db.query("SELECT * FROM aluno", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.render('lista-aluno', {
            title: "Alunos",
            labelId: 'ID',
            labelNumero: 'Número',
            labelNome: 'Nome',
            labelMorada: 'Morada',
            labelDetalhes: 'Detalhes',
            alunos: rows
        });
    });

});

// GET details by id
app.get('/aluno/details/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM aluno WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send(err);
        if (rows.length === 0)
            return res.status(404).send("Aluno não encontrado");
        res.render('detalhes-aluno', {
            title: "Detalhes",
            aluno: rows[0]
        });
    });
});

//API RESTFUL rotas

// GET ALL (JSON)
app.get('/api/aluno', (req, res) => {
    db.query("SELECT * FROM aluno", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows);
    });
});

// GET by id
app.get('/api/aluno/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM aluno WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows[0] || {});
    });
});

// POST
app.post('/api/aluno', (req, res) => {
    const { numero, nome, morada } = req.body;
    db.query(
        "INSERT INTO aluno (numero, nome, morada) VALUES (?, ?, ?)",
        [numero, nome, morada],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({
                id: result.insertId,
                numero, nome, morada
            });
        }
    );
});

// PUT
app.put('/api/aluno/:id', (req, res) => {
    const { numero, nome, morada } = req.body;
    const id = req.params.id;
    db.query(
        "UPDATE aluno SET numero=?, nome=?, morada=? WHERE id=?",
        [numero, nome, morada, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).json({
                id,
                numero, nome, morada
            });
        }
    );
});

// DELETE
app.delete('/api/aluno/:id', (req, res) => {
    var id = req.params.id;
    db.query("DELETE FROM aluno WHERE id=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(204).json({ msg: "Aluno removido!" });
    });
});

app.listen(8081);