

const anadirForm = document.forms['anadir-trabajador']
anadirForm.addEventListener('submit', function(e){
  e.preventDefault();
  const value = anadirForm
    .querySelector('input[type="text"]')
    .value
  trabajadores.anadirTrabajador(value)
  cuadro.actualizarCuadro()
})

const eliminarForm = document.forms['eliminar-trabajador']
eliminarForm.addEventListener('submit', function(e){
  e.preventDefault();
  const value = eliminarForm
    .querySelector('input[type="text"]')
    .value
  trabajadores.eliminarTrabajador(value)
  cuadro.actualizarCuadro()
})
// Esto manda la peticion para crear un dia.
// (El trabajador esta puesto 1 a siempre, no depende del form.)
const asignarForm = document.forms['asignar-trabajo']
asignarForm.addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = asignarForm
    .querySelector("#nombre")
    .value

  const fecha = asignarForm
    .querySelector("#dia")
    .value

  const horas = asignarForm
    .querySelector("#horas")
    .value

  const obra = asignarForm
    .querySelector("#obra")
    .value

    console.log("Obra=", obra)
  body = {
    "trabajador": 1,
    "obra": obra,
    "fecha":fecha,
    "horas":horas
  }
  body = JSON.stringify(body)
  console.log(body)

  request.open('POST', 'http://localhost:8000/dias/', true)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(body);
})

var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState == 4)
        if (request.status == 200){
          var response = JSON.parse(request.response)
          console.log(response)
          }
        }
