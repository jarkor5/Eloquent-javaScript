const caminos = [
    "Casa de Alicia-Casa de Bob", "Casa de Alicia-Casa de Caballos",
    "Casa de Alicia-Tienda", "Casa de Bob-Casa de Jardín",
    "Casa de Caballos-Tienda", "Mercado-Tienda",
    "Mercado-Casa de Iglesia", "Casa de Jardín-Casa de Iglesia",
    "Casa de Iglesia-Casa de Alicia"
  ];


  function construirGrafo(bordes) {
    let grafo = Object.create(null);
    function agregarBorde(de, a) {
      if (!grafo[de]) grafo[de] = [];
      grafo[de].push(a);
    }
    for (let [de, a] of bordes.map(r => r.split("-"))) {
      agregarBorde(de, a);
      agregarBorde(a, de);
    }
    return grafo;
  }
  
  const grafoPueblo = construirGrafo(caminos);


  function crearEstadoInicial(paquetes ){
    const lugares = Object.keys(grafoPueblo);
    const estadoPaquetes = []

    for (let i = 0; i < paquetes; i++){
        const lugarInicio = lugares[Math.floor(Math.random() * lugares.length)]
        let lugarDestino;
        do { 
            lugarDestino = lugares[Math.floor(Math.random() * lugares.length)]
        } while (lugarDestino == lugarInicio)

        estadoPaquetes.push({lugar: lugarInicio, dirección: lugarDestino})

    }
    return {lugar: "Casa de Alicia", paquetes: estadoPaquetes}
  }


  // el robot

  function ejecutarRobot(estado, robot, memoria){
    for (let turnos = 0; ; turnos++){
        if (estado.paquetes.length == 0){
            console.log(`Entregados en ${turnos} turnos`)
            break;
        }
        const accion = robot(estado,memoria)
        estado = moverRobot(estado, accion.direccion)
        memoria = accion.memoria
    }
  }


  //para mover el robot

  function moverRobot(estado, destino){
    if(!grafoPueblo[estado.lugar].includes(destino)){
        return estado //esto significa que el movimiento fue inválido
    }

    const paquetesActualizados = estado.paquetes.map(paquete => {
        if (paquete.lugar !== estado.lugar) return paquete
        return {lugar: destino, dirección: paquete.dirección}
    }).filter(paquete => paquete.lugar !== paquete.direccion)

    return {lugar: destino,  paquetes: paquetesActualizados}
  }


  // robot aleatorio

  function robotAleatorio(estado) {
    const posiblesMovimientos = grafoPueblo[estado.lugar]
    const direccion = posiblesMovimientos[Math.floor(Math.random() * posiblesMovimientos.length)]
    return {direccion, memoria: []}
  }

  // hacer que se encuentre la ruta más corta

  function encontrarRuta(grafo, inicio, destino) {
    const cola = [{ lugar: inicio, ruta: [] }]; 
    while (cola.length > 0) {
      const { lugar, ruta } = cola.shift(); 
      for (const lugarSiguiente of grafo[lugar]) { 
        if (lugarSiguiente === destino) {
          return ruta.concat(lugarSiguiente); 
        }
        if (!cola.some(n => n.lugar === lugarSiguiente)) {
          cola.push({ lugar: lugarSiguiente, ruta: ruta.concat(lugarSiguiente) }); 
        }
      }
    }
  }


  //robot de la rurta más corta

  function robotRutaCorta(estado, memoria){
    if(memoria.length === 0){
        const paquete = estado.paquetes[0]
        if(paquete.lugar !== estado.lugar){
            memoria = encontrarRuta(grafoPueblo, estado.lugar, paquete.lugar)
        }
        else {
            memoria = encontrarRuta(grafoPueblo, estado.lugar, paquete.direccion)
        }
    }
    return {direccion: memoria[0], memoria: memoria.slice(1)}
  }

  // comparar los robots

  function compararRobots(robot1, memoria1, robot2, memoria2){
    let turnosRobot1 = 0
    let turnosRobot2 = 0

    for (let i = 0; i < 100; i++){
        const estadoInicial = crearEstadoInicial(5)
        turnosRobot1 += ejecutarRobot(estadoInicial, robot1, memoria1)
        turnosRobot2 += ejecutarRobot(estadoInicial, robot2, memoria2)
    }
    console.log('El promedio de turnos del robot 1 es: ', turnosRobot1 / 100)
    console.log('El promedio de turnos del robot 2 es: ', turnosRobot2 / 100)
  }

  compararRobots(robotAleatorio, [], robotRutaCorta, [])