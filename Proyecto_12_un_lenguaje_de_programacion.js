function saltarEspacio(cadena) {
    let coincidencia = cadena.match(/^(?:\s|#.*)*/)
    return cadena.slice(coincidencia[0].length)
  }
  
  function parsearExpresion(programa) {
    programa = saltarEspacio(programa)
    let coincidencia, expr
    if (coincidencia = /^"([^"]*)"/.exec(programa)) {
      expr = {tipo: "valor", value: coincidencia[1]}
    } else if (coincidencia = /^\d+\b/.exec(programa)) {
      expr = {tipo: "valor", value: Number(coincidencia[0])}
    } else if (coincidencia = /^[^\s(),"]+/.exec(programa)) {
      expr = {tipo: "palabra", name: coincidencia[0]}
    } else {
      throw new SyntaxError("Sintaxis inesperada: " + programa)
    }
    return parsearAplicacion(expr, programa.slice(coincidencia[0].length))
  }
  
  function parsearAplicacion(expr, programa) {
    programa = saltarEspacio(programa)
    if (programa[0] != "(")
      return {expr: expr, resto: programa}
    programa = saltarEspacio(programa.slice(1))
    expr = {tipo: "aplicar", operator: expr, args: []}
    while (programa[0] != ")") {
      let arg = parsearExpresion(programa)
      expr.args.push(arg.expr)
      programa = saltarEspacio(arg.resto)
      if (programa[0] == ",")
        programa = saltarEspacio(programa.slice(1))
      else if (programa[0] != ")")
        throw new SyntaxError("Se esperaba ',' o ')'")
    }
    return parsearAplicacion(expr, programa.slice(1))
  }
  
  function parsear(programa) {
    let {expr, resto} = parsearExpresion(programa)
    if (saltarEspacio(resto).length > 0)
      throw new SyntaxError("Texto inesperado después del programa")
    return expr
  }
  
  const specialForms = Object.create(null)
  
  function evaluar(expr, scope) {
    switch(expr.tipo) {
      case "valor":
        return expr.value
      case "palabra":
        if (expr.name in scope)
          return scope[expr.name]
        else
          throw new ReferenceError(`Binding indefinido: ${expr.name}`)
      case "aplicar":
        let {operator, args} = expr
        if (operator.tipo == "palabra" && operator.name in specialForms)
          return specialForms[operator.name](expr.args, scope)
        let op = evaluar(operator, scope)
        if (typeof op == "function")
          return op(...args.map(arg => evaluar(arg, scope)))
        else
          throw new TypeError("Se intenta aplicar algo que no es función")
    }
  }
  
  specialForms.si = (args, scope) => {
    if (args.length != 3)
      throw new SyntaxError("Número incorrecto de argumentos para si")
    if (evaluar(args[0], scope) !== false)
      return evaluar(args[1], scope)
    else
      return evaluar(args[2], scope)
  }
  
  specialForms.while = (args, scope) => {
    if (args.length != 2)
      throw new SyntaxError("Número incorrecto de argumentos para while")
    while (evaluar(args[0], scope) !== false) {
      evaluar(args[1], scope)
    }
    return false
  }
  
  specialForms.hacer = (args, scope) => {
    let value = false
    for (let arg of args) {
      value = evaluar(arg, scope)
    }
    return value
  }
  
  specialForms.definir = (args, scope) => {
    if (args.length != 2 || args[0].tipo != "palabra")
      throw new SyntaxError("Uso incorrecto de definir")
    let value = evaluar(args[1], scope)
    scope[args[0].name] = value
    return value
  }
  
  specialForms.fun = (args, scope) => {
    if (args.length === 0)
      throw new SyntaxError("Las funciones necesitan un cuerpo")
    let body = args[args.length - 1]
    let params = args.slice(0, args.length - 1).map(expr => {
      if (expr.tipo != "palabra")
        throw new SyntaxError("El nombre del parámetro debe ser una palabra")
      return expr.name
    })
    return function(...argumentos) {
      if (argumentos.length != params.length)
        throw new TypeError("Número incorrecto de argumentos")
      let scopeLocal = Object.create(scope)
      for (let i = 0; i < argumentos.length; i++) {
        scopeLocal[params[i]] = argumentos[i]
      }
      return evaluar(body, scopeLocal)
    }
  }
  
  specialForms.set = (args, scope) => {
    if (args.length != 2 || args[0].tipo != "palabra")
      throw new SyntaxError("Uso incorrecto de set")
    let nombre = args[0].name
    let valor = evaluar(args[1], scope)
    for (let s = scope; s; s = Object.getPrototypeOf(s)) {
      if (Object.prototype.hasOwnProperty.call(s, nombre)) {
        s[nombre] = valor
        return valor
      }
    }
    throw new ReferenceError(`No se puede modificar variable inexistente: ${nombre}`)
  }
  
  const topScope = Object.create(null)
  topScope.true = true
  topScope.false = false
  for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b`)
  }
  topScope.imprimir = value => {
    console.log(value)
    return value
  }
  topScope.array = (...values) => values
  topScope.length = array => array.length
  topScope.element = (array, n) => array[n]
  
  function run(programa) {
    return evaluar(parsear(programa), Object.create(topScope))
  }
  
  run(`
  hacer(
    definir(total, 0),
    definir(count, 1),
    while(<(count, 11),
      hacer(
        definir(total, +(total, count)),
        definir(count, +(count, 1))
      )
    ),
    imprimir(total)
  )
  `)
  
  run(`
  hacer(
    definir(sum, fun(array,
      hacer(
        definir(i, 0),
        definir(sum, 0),
        while(<(i, length(array)),
          hacer(
            definir(sum, +(sum, element(array, i))),
            definir(i, +(i, 1))
          )
        ),
        sum
      )
    )),
    imprimir(sum(array(1, 2, 3)))
  )
  `)
  
  run(`
  hacer(
    definir(f, fun(a, fun(b, +(a, b)))),
    imprimir(f(4)(5))
  )
  `)
  
  
  run(`
  hacer(
    definir(x, 4),
    definir(setx, fun(val, set(x, val))),
    setx(50),
    imprimir(x)
  )
  `)
  