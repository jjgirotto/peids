//importação do módulo
var express = require('express'); 
//inicialização do módulo
var app = express();

// CONTADOR GLOBAL DE ROTAS
let contador = [];
app.use((req, res, next) => {
    let rota = req.path; //caminho da rota
    //ignorando css
    if (rota.startsWith('/css')) return next();
    //tratando a rota index.html como / (para não contar duas vezes)
    if (rota === '/index.html') rota = '/';
    const rotaExistente = contador.find(r => r.rota === rota);
    if (rotaExistente) {
        rotaExistente.contagem++;
    } else {
        contador.push({ rota, contagem: 1 });
    }
    console.log("Novo pedido à " + rota + " recebido às: " + new Date().toLocaleString());
    console.log("Contador: " + JSON.stringify(contador));
    next();
});

//api para registrar em "requests.txt" os pedidos recebidos
var apiLogger = require('./routes/api.js');
app.use(apiLogger);

//pasta public como estática
app.use(express.static(__dirname + '/public'));

//Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//Rotas forms
var rotas = require('./routes/rotas-forms.js');
app.use('/', rotas);

//rota de erro
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/erro.html');
});


//inicialização do servidor
app.listen(8081);

