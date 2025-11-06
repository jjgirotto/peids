const cores = ["vermelho","amarelo","azul","verde","preto"];
function concatenarElementos(cores) {
    console.log(cores.join(", "));
}

function arrayEmMaiusculas(cores) {
    for (let i = 0; i < cores.length; i++) {
        cores[i] = cores[i].toUpperCase();
    }
    console.log(cores);
}

function verificaNumeros(cores) {
    let resultado = [];
    for (let i = 0; i < cores.length; i++) {
        if (isNaN(cores[i])) {
            resultado.push(`Elemento ${cores[i]} não é um número.`);            
        } else {
            resultado.push(`Elemento ${cores[i]} é um número.`);
        }
    }
    return resultado;
}

module.exports = {
    cores,
    concatenarElementos,
    arrayEmMaiusculas,
    verificaNumeros
};