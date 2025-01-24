// ejercicio 1: minimo

function minimo(a, b){
    if (a < b){
        return a
    }
    else {
        return b
    }
}

console.log(miinimo(8, 40))
console.log(minimo(25, -10))


//ejercicio 2: reursión

function esPar(numero){
    if (numero < 0){
        numero = Math.abs(numero)
    }
    if (numero === 0){
        return true
    }
    else if (numero === 1){
        return false
    }
    else{
        return esPar(numero -2)
    }

}


console.log(esPar(46))

//ejercicio 3: contar frijoles

function contarCaracteres(String,  caracter){
    let contador = 0
    for (let i = 0; i < String.length; i++){
        if (String[i] === caracter){
            contador++
        }
    }
    return contador
}

function contarFrijoles(string){
    return contarCaracteres(string, 'F')
}

console.log(contarFrijoles('FFrFrijolesFF'))
console.log(contarCaracteres('FFrFrijolesFF', 'F'))