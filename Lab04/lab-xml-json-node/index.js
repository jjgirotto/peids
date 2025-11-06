var express = require('express');
var app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('Servidor XML/JSON ativo!');
});

//pasta public como estática
app.use(express.static(__dirname + '/public'));

//para json
app.get('/api/json', (req, res) => {
    const data = fs.readFileSync('./data/pessoas.json');
    res.json(JSON.parse(data));
});

//para xml
app.get('/api/xml', (req, res) => {
    const data = fs.readFileSync('./data/pessoas.xml', 'utf8');
    res.set('Content-Type', 'application/xml');
    res.send(data);
});

app.listen(8080);