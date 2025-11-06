//Utilizando o módulo circulo.js
const circulo = require("./circulo.js");
console.log(circulo.area(1));
console.log(circulo.perimetro(2));
console.log(circulo.PI);

//Utilizando o módulo circulo.js
const mensagem = require("./mensagem.js");
mensagem("Olá mundo!");

//Utilizando o módulo pedido.js
const pedido = require('./pedido.js');

//Utilizando o módulo arrays.js
let { cores, concatenarElementos, arrayEmMaiusculas, verificaNumeros } = require("./arrays.js");
concatenarElementos(cores);
arrayEmMaiusculas(cores);
let arrayResultado = verificaNumeros(cores);
console.log(arrayResultado);

//Utilizando o módulo aluno.js
var Aluno = require("./aluno.js");
let alunos = [new Aluno(1, "Ana", "Rua A", 20),
    new Aluno(2, "Bia", "Rua das Folhas", 24),
    new Aluno(3, "Carol", "Rua Magnolia", 30),
    new Aluno(4, "Daiana", "Rua D", 40),
    new Aluno(5, "Eloisa", "Rua Artes", 28),
]

alunos.forEach(aluno => console.log(aluno.descritivo()));

function gerarAlunos(n) {
    let lista = [];
    numero = 0;
    for (let i = 0; i < n; i++) {
        numero++;
        let idadeAleatoria = Math.floor(Math.random() * 100);
        lista.push(
            new Aluno(
                numero,
                `Nome${numero}`,
                `Morada${numero}`,
                idadeAleatoria
            )
        );
    }
    return lista;
}
let alunosGerados = gerarAlunos(3);
alunosGerados.forEach(aluno => console.log(aluno.descritivo(), "; Idade:", aluno.idade, "; Morada:", aluno.morada, "; Número:", aluno.numero));

function idadeSuperior(alunosGerados, idade) {
    let resultado = [];
    for (let i = 0; i < alunosGerados.length; i++) {
        if (alunosGerados[i].idade > idade) {
            resultado.push(alunosGerados[i]);
        }
    }
    return resultado;
}

console.log("\nAlunos com idade > 18:");
let maiores = idadeSuperior(alunosGerados, 18);
maiores.forEach(aluno => console.log(aluno.descritivo(), "; Idade:", aluno.idade));