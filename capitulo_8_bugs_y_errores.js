//ejercicio  1: reintentar

function FalloUnidadMultiplicacion(message) {
    this.name = "FalloUnidadMultiplicacion";
    this.message = message || "Default Message";
    this.stack = new Error().stack;
  }
  FalloUnidadMultiplicacion.prototype = Object.create(Error.prototype);
  FalloUnidadMultiplicacion.prototype.constructor = FalloUnidadMultiplicacion;
  
  function multiplicacionPrimitiva(a, b) {
    if (Math.random() < 0.2) {
      return a * b;
    } else {
      throw new FalloUnidadMultiplicacion("He fallado");
    }
  }
  
  function multiplicacionConfiable(a, b) {
    while (true) {
      try {
        return multiplicacionPrimitiva(a, b);
      } catch (error) {
        if (!(error instanceof FalloUnidadMultiplicacion)) {
          throw error;
        }
      }
    }
  }
  
  console.log(multiplicacionConfiable(8, 8));

  //ejerciccio 2: caja bloqueada

  const caja = {
    bloqueada: true,
    desbloquear() { this.bloqueada = false; },
    bloquear() { this.bloqueada = true; },
    _contenido: [],
    get contenido() {
      if (this.bloqueada) throw new Error("Bloqueada!");
      return this._contenido;
    }
  };
  
  function conCajaDesbloqueada(cuerpo) {
    const estabaBloqueada = caja.bloqueada; 
    if (estabaBloqueada) caja.desbloquear(); 
  
    try {
      cuerpo(); 
    } finally {
      if (estabaBloqueada) caja.bloquear(); 
    }
  }
  
  conCajaDesbloqueada(function() {
    caja.contenido.push("moneda de oro");
  });
  
  try {
    conCajaDesbloqueada(function() {
      throw new Error("Piratas en el horizonte! Abortar!");
    });
  } catch (e) {
    console.log("Error encontrado:", e);
  }
  
  console.log(caja.bloqueada);

  