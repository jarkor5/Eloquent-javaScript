// ejercicio 1: la suma de un rango

function rango(inicio, final, paso = inicio < final ? 1 : -1){
    let array = []
    if (paso > 0){
        for (let i = inicio; i <= final; i += paso){
            array.push(i)
        }
    }
    else {
        for (let i = inicio; i >= final; i += paso){
            array.push(i)
        }
    }
    return array
}

console.log(rango(22, 50));

// ejercicio 2: revertir array

function revertirArray(array){
    let arrayNuevo = []
    for (let i = array.length - 1; i >= 0; i--){
        arrayNuevo.push(array[i])
    }

    return arrayNuevo

}

function revertirArrayEnLugarDe(array){
    for ( let i = 0; i < Math.floor(array.length / 2); i++){
let otro = array[i]
array[i] = array[array.length -1 - i]
array[array.length - 1 -i ] = otro
    }
}

console.log(revertirArray([15, 24, 46]))

let valores = [1, 2, 3, 4, 5]
revertirArrayEnLugarDe(valores)
console.log(valores)


// ejercicio 3: lista

function arrayALista(array) {
    let lista = null;
    for (let i = array.length - 1; i >= 0; i--) {
      lista = { valor: array[i], resto: lista };
    }
    return lista;
  }
  
  function listaAArray(lista) {
    let array = [];
    for (let nodo = lista; nodo; nodo = nodo.resto) {
      array.push(nodo.valor);
    }
    return array;
  }
  

  function preceder(elemento, lista) {
    return { valor: elemento, resto: lista };
  }
  

  function posicion(lista, posicion) {
    if (posicion === 0) {
      return lista ? lista.valor : undefined;
    } else if (!lista) {
      return undefined;
    }
    return posicion(lista.resto, posicion - 1);
  }
  
  console.log(arrayALista([10, 20]));

  console.log(listaAArray(arrayALista([10, 20, 30])));

  console.log(preceder(10, preceder(20, null)));


  // ejercicio 4: comparacion profuda

function comparacionProfunda( a, b){
    if (a === b){
        return true
    }
    if (a == null || typeof a != 'object' || b == null || typeof b != 'object'){
        return false
    }

    let keysA = Object.keys(a), keysB = Object.keys(b)

    if (keysA.length != keysB.length){
        return false
    }

    for (let key of keysA){
        if (!keysB.includes(key) || !comparacionProfunda(a[key], b[key])){
            return false
        }
    }

    return true
}

let objeto = {a: 15, b: 20}

console.log(comparacionProfunda(objeto, objeto))

