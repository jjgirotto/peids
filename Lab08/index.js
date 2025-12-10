var express = require('express');
var app = express();
var db = require('./config/db');
var jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
    if(req.body.username === 'juliana' && req.body.password === '123456') {
        //auth ok
        const id = 1; //id retornado da base de dados
        const token = jwt.sign({ id }, 'palavrasecreta', {
            expiresIn: 300 // expira em 5min (300 segundos)
        });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({message: 'Invalid Login.'});
});

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ auth: false, message: 'No token provided.'});
    jwt.verify(token, 'palavrasecreta', function(err, decoded) {
        if (err)
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.'});
            // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

//API RESTFUL rotas

// GET ALL (JSON) - rota protegida por JWT
app.get('/api/aluno', verifyJWT, (req, res) => {
    db.query("SELECT * FROM aluno", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(rows);
    });
});

// GET by id - rota protegida por JWT
app.get('/api/aluno/:id', verifyJWT, (req, res) => {
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