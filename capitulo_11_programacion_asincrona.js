//ejerciccio 1 : siguiendo el bisturí


// usando async/await 

async function localizarBisturi(nido) {
    let actual = nido
    while (true) {
      let siguiente = await cualquierAlmacenamiento(actual, "bisturí")
      if (siguiente === actual) {
        return actual
      }
      actual = siguiente
    }
  }
  

// usando promesas

function localizarBisturi2(nido){
    function buscar (actual){
        return cualquierAlmacenamiento(actual, "bisturí").then(siguiente => {
            if (siguiente === actual){
                return actual
                }
                return buscar(siguiente)
        })
    }
    return buscar(nido)
}

localizarBisturi(granRoble).then(console.log)



//ejercicio 2: construyendo un sistema de promesas

function Promise_all(promesas) {
    return new Promise((resolve, reject) => {
      let results = []
      let count = 0
      const total = promesas.length
      if (total === 0) {
        resolve([])
        return
      }
      promesas.forEach((promesa, i) => {
        Promise.resolve(promesa)
          .then(valor => {
            results[i] = valor
            count++
            if (count === total) {
              resolve(results)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    })
  }
  