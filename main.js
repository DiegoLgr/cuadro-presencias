function Obra(codigo, color){
  this.codigo = codigo
  this.color = color
}
function Dia(numero, horas, obra){
  this.numero = numero
  this.horas = horas
  this.obra = obra
}

function Trabajador(nombre){
  this.nombre = nombre
  let _nombre = nombre
  let obraVacia = new Obra(0, "#eee")
  this.dias = [new Dia(0, 0, obraVacia)]
  that = this

  this.aLista = function(){
    let lista =[]
    this.dias.forEach(function(dia){
      let listaDia = [_nombre]
      listaDia.push(dia.numero)
      listaDia.push(dia.horas)
      listaDia.push(dia.obra.color)
      listaDia.push(dia.obra.codigo)
      lista.push(listaDia)
    })
    return lista
  }
}

function Trabajadores(){
  let trabajadores = {}

  this.anadirTrabajador = function(nombre){
    trabajadores[nombre] = new Trabajador(nombre)
  }
  this.asignarTrabajo = function(nombre, numeroDia, horas, obra){
    let prueba = new Dia(numeroDia, horas, obra)
    trabajadores[nombre].dias.push(prueba)
  }
  this.mostrarTrabajador = function(nombre){
    console.log(trabajadores[nombre])
  }
  this.nombresTrabajadores =function(){
   return Object.keys(trabajadores)
 }
 this.aFormatoAsignacion = function(){
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
    trabajadores.aFormatoAsignacion()
    .forEach(function(trabajador){
      cuadro.asignarTrabajo.apply(this, trabajador)
    })
  }
  this.actualizarCuadro = function(){
    d3.select("#svg").remove()
    this.pintarCuadro()
   }
}


puntoRoma = new Obra(509, "#6c8")
trabajadores = new Trabajadores()
trabajadores.anadirTrabajador("Pepe")
trabajadores.anadirTrabajador("Juan")
trabajadores.anadirTrabajador("Sebastian")

trabajadores.asignarTrabajo("Pepe", 1, 5, puntoRoma)
trabajadores.asignarTrabajo("Pepe", 5, 8, puntoRoma)
trabajadores.asignarTrabajo("Juan", 3, 9, puntoRoma)
trabajadores.asignarTrabajo("Juan", 8, 9, puntoRoma)
trabajadores.asignarTrabajo("Sebastian", 2, 8, puntoRoma)
trabajadores.asignarTrabajo("Sebastian", 1, 8, puntoRoma)

cuadro = new ControladorCuadro(trabajadores)
cuadro.pintarCuadro()
