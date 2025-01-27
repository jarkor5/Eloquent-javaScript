//ejercicio 1:  vector

class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    mas(otro){
        return new Vec(this.x + otro.x, this.y + otro.y)
    }

    menos(otro){
        return new Vec(this.x - otro.x, this.y - otro.y)
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

}

console.log(new Vec(1, 2).mas(new Vec(2, 3)))


// ejercicio 2: tomando un metodo prestado

let mapa = {uno: true, dos: true, tres: true}

console.log(Object.prototype.hasOwnProperty.call(mapa, "uno"))

