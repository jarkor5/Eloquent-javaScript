// Ejercicio 1: estilo entre comillas

let texto = "'I'm the cook,' he said, 'it's my job.'";

console.log(texto.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));


// ejercicio 2: 

let numero = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;

for ( let string of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
    if (!numero.test(string)) {
        console.log(`Error en la prueba ${string}`);
    }
}

for ( let string of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
    if (numero.test(string)) {
        console.log(`incorrectamente acepto ${string}`);
    }
}