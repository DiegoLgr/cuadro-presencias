
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
// TRABAJADORES.
function Trabajadores(){
  let APIsrc = 'http://localhost:8000/datos-cuadro/'
  let trabajadores = {}
  let that = this
  this.anadirTrabajador = function(nombre){
    if(!trabajadores.hasOwnProperty(nombre))
      trabajadores[nombre] = new Trabajador(nombre)
  }
  this.eliminarTrabajador = function(nombre){
    delete trabajadores[nombre]
  }
  this.asignarTrabajo = function(nombre, fecha, horas, codigoObra, color){
  // E.g.: trabajadores.asignarTrabajo("Pepe", "2018-05-01", 5, "#6c8", 509)
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
     .forEach((dia)=>resultado.push(dia))
   })
    return resultado
  }
  this.cargarDatosDesdeAPI = function (){
    let request = new XMLHttpRequest()
    let resultado = new Promise((resolve, reject)=>{
      request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200){
              let response = JSON.parse(request.response)
              response.forEach((dia)=>{
                if (!that.nombresTrabajadores().includes(dia.nombre))
                  that.anadirTrabajador(dia.nombre)
                  that.asignarTrabajo(
                    dia.nombre, dia.fecha, dia.horas, dia.color, dia.codigo)
            })
            resolve()
          }
          else reject("Fallo")
        }
      })
      request.open('GET', APIsrc, true)
      request.send(null);
      return resultado
  }
}

function ControladorCuadro(){
  let trabajadores = new Trabajadores
  let cuadro = new Cuadro()
  let that = this
  this.pintarCuadro = function(){
    cuadro.setTrabajadores(trabajadores.nombresTrabajadores())
    cuadro.setRangoDias()
    cuadro.construirCuadro()
    trabajadores.listarDias()
      .forEach((dia)=>cuadro.rellenarDia.apply(this, dia))
  }
  this.CargarDatosYPintar = function(){
    trabajadores.cargarDatosDesdeAPI()
    .then(()=>that.pintarCuadro(), ()=>console.log("Ha habido un error con la peticion"))
  }

  this.addWorkerForm = function(){
      let trabajadorInput = document.createElement('input')
      trabajadorInput.setAttribute('type', 'text')
      trabajadorInput.setAttribute('name', 'nombre')
      trabajadorInput.setAttribute('id', 'nombre')
      let documentoInput = document.createElement('input')
      documentoInput.setAttribute('type', 'text')
      documentoInput.setAttribute('name', 'documento')
      documentoInput.setAttribute('id', 'documento')
      let fechaContratoInput = document.createElement('input')
      fechaContratoInput.setAttribute('type', 'date')
      fechaContratoInput.setAttribute('name', 'fecha-contrato')
      fechaContratoInput.setAttribute('id', 'fecha')
      let botonEnviar = document.createElement('input')
      botonEnviar.setAttribute('type', 'submit')
      botonEnviar.setAttribute('value', 'submit')
      let anadirTrabajadorForm = document.createElement('form')
      anadirTrabajadorForm.setAttribute('name', 'anadir-trabajador')
      anadirTrabajadorForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const nombre = anadirTrabajadorForm.querySelector('#nombre').value
        const documento = anadirTrabajadorForm.querySelector('#documento').value
        const fecha = anadirTrabajadorForm.querySelector('#fecha').value
        let datos = {
          'nombre': nombre,
          'documento_identificacion': documento,
          'fecha_primer_contrato': fecha
        }
        datos = JSON.stringify(datos)
        let request = new XMLHttpRequest()
        request.open('POST','http://localhost:8000/trabajadores/', true)
        request.setRequestHeader("Content-Type", 'application/json')
        request.send(datos)
      })
      anadirTrabajadorForm.appendChild(trabajadorInput)
      anadirTrabajadorForm.appendChild(documentoInput)
      anadirTrabajadorForm.appendChild(fechaContratoInput)
      anadirTrabajadorForm.appendChild(botonEnviar)
      document.getElementsByTagName('body')[0]
      .appendChild(anadirTrabajadorForm)
    }
}
