// first exercise 
for (let line = '#'; line.length < 7 ; line += '#') {
    console.log(line)
}


// segundo ejercicio (Bucle de FizzBuzz)

for (let i = 1; i <= 100; i++){
    if ( i % 3 == 0 && i % 5 == 0){
        console.log('FizzBuzz')
    }

    else if ( i % 3 == 0){
        console.log('Fizz')
    }
    else if (i % 5 == 0){
        console.log('Buzz')
    }

    else {
        console.log( 'the number is: ' + i)
    }
}


// tercer ejercicio (tablero de ajedrez)

let tablero = ''
let tamañoDelTablero = 8

for (let fila = 0; fila < tamañoDelTablero; fila++){
    for (let columna = 0; columna < tamañoDelTablero; columna++){
        if ((fila + columna) % 2 == 0){
            tablero += ' '
        }
        else { 
            tablero += '#'
        }
    }
    tablero += '\n'
}
console.log(tablero)

