
function Dia(fecha, horas, codigo, color){
  this.fecha= new Date(fecha)
  this.horas = horas
  this.codigo = codigo
  this.color = color
}

function Trabajador(nombre){
  this.nombre = nombre
  let _nombre = nombre
  this.dias = [new Dia(0, 0, 0, "")]
  that = this
  this.aLista = function(){
    // Pasa de lista da objetos a lista de listas:
    // [{foo: tal, bar: cual}] => [[tal, cual]]
    let lista =[]
    this.dias
      .forEach((dia)=>{
        // Dar formato a la fecha.
          let d = dia.fecha.getDate()
          let m = dia.fecha.getMonth() + 1
          let a = dia.fecha.getFullYear()
          let fecha = [a,
                       (m > 9 ? "" : '0') + m,
                       (d > 9 ? "" : '0') + d
                      ].join('-')
          let listaDia = [_nombre]
          listaDia.push(fecha)
          listaDia.push(dia.horas)
          listaDia.push(dia.codigo)
          listaDia.push(dia.color)
          lista.push(listaDia)
        return listaDia
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
  this.asignarTrabajo = function(nombre, fecha, horas, codigoObra, color){
    let prueba = new Dia(fecha, horas, codigoObra, color)
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
  let cuadro = new Cuadro();
  this.pintarCuadro = function(){
    cuadro.setTrabajadores(trabajadores.nombresTrabajadores())
    cuadro.setRangoDias()
    cuadro.construirCuadro()
    trabajadores.listarDias()
      .forEach(function(trabajador){
        console.log(trabajador)
        cuadro.rellenarDia.apply(this, trabajador)
      })
  }
}
// AJAX
// Creo que este es el ajax que pinta el cuadro en funcion de
// los datos de la API
// var btn = document.getElementById('request')
// var request = new XMLHttpRequest()
//     request.onreadystatechange = function () {
//       if (request.readyState == 4)
//         if (request.status == 200){
//           var response = JSON.parse(request.response)
//           // let dia = response[0]
//           response.forEach(function(dia){
//             numeroDia = dia.fecha.slice(8,10)
//             if (numeroDia<10)numeroDia = numeroDia[1]
//             trabajadores.asignarTrabajo(dia.nombre, numeroDia, dia.horas, dia.color, dia.codigo)
//             cuadro.actualizarCuadro()
//           })
//         }
//
//     }
//     btn.addEventListener('click', function(){
//       request.open('GET', 'http://localhost:8000/datos-cuadro/', true)
//       request.send(null);
//     })
