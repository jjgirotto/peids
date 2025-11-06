var fs = require('fs');
var path = require('path');
var failedFile = path.join(__dirname, '../failedRequests.json');

// salvar pedidos falhados
function registrarFalha(req, motivo) {
    let falhas = [];
    // Se já existir ficheiro, lê as falhas antigas
    if (fs.existsSync(failedFile)) falhas = JSON.parse(fs.readFileSync(failedFile, 'utf-8'));
    let falha = {
        data: new Date().toISOString(),
        ip: req.ip,
        url: req.originalUrl,
        metodo: req.method,
        body: req.body,
        motivo
    };
    falhas.push(falha);
    fs.writeFileSync(failedFile, JSON.stringify(falhas, null, 2));
}

function calcularIdade(data) {
    const hoje = new Date();
    const nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    // Se o mês atual for menor/igual que o mês de nascimento e o dia ainda não chegou, diminui 1 ano na idade
    if (hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

//autenticação middleware
function autenticacao(req, res, next) {
    const { numero, nome, data } = req.body;
    const numeroAluno = parseInt(numero);
    const nomeValido = nome.toUpperCase().includes('PIS');
    const idade = calcularIdade(data);
    // Verificações
    let motivo = '';
    if (numeroAluno % 2 !== 0) {
      motivo = 'Número do aluno ímpar';
      registrarFalha(req, motivo);
      return res.status(403).sendFile(path.join(__dirname, '../public/erro-general.html'));
    }
    if (!nomeValido) {
      motivo = 'Nome do aluno não contém PIS';
      registrarFalha(req, motivo);
      return res.status(403).sendFile(path.join(__dirname, '../public/erro-general.html'));
    }
    if (idade <= 20) {
      motivo = 'Aluno com idade inferior ou igual a 20 anos';
      registrarFalha(req, motivo);
      return res.status(403).sendFile(path.join(__dirname, '../public/erro-general.html'));
    }
    next();
}

module.exports = autenticacao;
