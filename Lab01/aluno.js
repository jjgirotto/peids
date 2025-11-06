class Aluno {
    constructor(numero, nome, morada, idade) {
        this.numero = numero;
        this.nome = nome;
        this.morada = morada;
        this.idade = idade;
    }

    descritivo() {
        return `Nome: ${this.nome}; Número: ${this.numero}`;
    }

}

module.exports = Aluno;