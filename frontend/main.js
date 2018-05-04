
function Dia(numero, horas, codigoObra, color){
  this.numero = numero
  this.horas = horas
  this.codigoObra = codigoObra
  this.color = color
}

function Trabajador(nombre){
  this.nombre = nombre
  let _nombre = nombre
  this.dias = [new Dia(0, 0, 0, "")]
  that = this

  this.aLista = function(){
    // Pasa de objeto a lista:
    // {foo: tal, bar: cual} => [tal, cual]
    let lista =[]
    this.dias
      .forEach(
        function(dia){
          let listaDia = [_nombre]
          listaDia.push(dia.numero)
          listaDia.push(dia.horas)
          listaDia.push(dia.codigoObra)
          listaDia.push(dia.color)
          lista.push(listaDia)
        })
        return lista
      }
}

function Trabajadores(){
  let trabajadores = {}

  this.anadirTrabajador = function(nombre){
    if(!trabajadores.hasOwnProperty(nombre))
      trabajadores[nombre] = new Trabajador(nombre)
  }
  this.eliminarTrabajador = function(nombre){
    delete trabajadores[nombre]
  }
  this.asignarTrabajo = function(nombre, numeroDia, horas, codigoObra, color){
    let prueba = new Dia(numeroDia, horas, codigoObra, color)
    trabajadores[nombre].dias.push(prueba)
  }
  this.mostrarTrabajador = function(nombre){
    console.log(trabajadores[nombre])
  }
  this.nombresTrabajadores =function(){
   return Object.keys(trabajadores)
 }
 this.listarDias= function(){
   /* Coje los dias de las listas de los trabajadores y las
      va metiendo en una unica lista
      [[dia,dia], [dia,dia]] => [dia, dia, dia, dia]
   */

   let resultado = []
   Object.keys(trabajadores)
   .map(function(nombre){
     trabajadores[nombre]
     .aLista()
     .forEach((dia)=>resultado.push(dia))})
    return resultado
 }
}

function ControladorCuadro(trabajadores){
  let cuadro = new CuadroPresencias();

  this.pintarCuadro = function(){
    cuadro.pintarCuadro(trabajadores.nombresTrabajadores())
    trabajadores.listarDias()
      .forEach(function(trabajador){
        cuadro.asignarTrabajo.apply(this, trabajador)
      })
  }
  this.actualizarCuadro = function(){
    d3.select("#svg").remove()
    this.pintarCuadro()
   }
}

let trabajadores = new Trabajadores()
trabajadores.anadirTrabajador("Pepe")
trabajadores.anadirTrabajador("Juan")
trabajadores.anadirTrabajador("Sebastian")

// trabajadores.asignarTrabajo("Pepe", 1, 5, "#6c8", 509)
// trabajadores.asignarTrabajo("Pepe", 5, 8, "#6c8", 509)
// trabajadores.asignarTrabajo("Juan", 3, 9, "#6c8", 509)
// trabajadores.asignarTrabajo("Juan", 8, 9, "#6c8", 509)
// trabajadores.asignarTrabajo("Sebastian", 2, 8, "#6c8", 509)
// trabajadores.asignarTrabajo("Sebastian", 1, 8, "#6c8", 509)

cuadro = new ControladorCuadro(trabajadores)
cuadro.pintarCuadro()



// AJAX
var btn = document.getElementById('request')
var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState == 4)
        if (request.status == 200){
          var response = JSON.parse(request.response)
          // let dia = response[0]
          response.forEach(function(dia){
            numeroDia = dia.fecha.slice(8,10)
            if (numeroDia<10)numeroDia = numeroDia[1]
            trabajadores.asignarTrabajo(dia.nombre, numeroDia, dia.horas, dia.color, dia.codigo)
            cuadro.actualizarCuadro()
          })
        }

    }
    btn.addEventListener('click', function(){
      request.open('GET', 'http://localhost:8000/datos-cuadro/', true)
      request.send(null);
    })
