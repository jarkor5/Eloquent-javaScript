//ejercicio 1: aplanamientoo
let arrays = [[1,2,3], [4,5], [6]]

let aplanado = arrays.reduce((acumulador, valorActual)=> acumulador.concat(valorActual, []))

console.log(aplanado)


//ejercicio 2: mi propio ciclo

function miCiclo(array, prueba, actualización, cuerpo){
    while ( prueba(array)){
        cuerpo(array)
        array = actualización(array)
    }
}

miCiclo(8, n => n > 0, n => n - 1, console.log);


//ejercicio 3: cada uno

function cada(array, test) {
    for (let elemento of array) {
      if (!test(elemento)) {
        return false;
      }
    }
    return true;
  }
  
  console.log(cada([1, 3, 5], n => n < 10));


