const request = require('native-request');
const fs = require('fs');

request.get('http://www.google.com', (err, data, status, headers) => {
if (err) {
    console.log(err);
}

fs.writeFile("pagina.html", data, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Página criada com sucesso");
});
console.log('A criar o ficheiro...');

});