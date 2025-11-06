const PI = 3.14159;

const area = (raio) => {
 return PI * raio * raio;
}

const perimetro = (raio) => {
 return PI * 2 * raio;
}

module.exports = { PI, area, perimetro };
