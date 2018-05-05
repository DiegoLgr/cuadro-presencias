

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
const asignarForm = document.forms['asignar-trabajo']
// Esto manda la peticion para crear un dia.
// (El trabajador esta puesto 1 a siempre, no depende del form.)
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
  console.log(request)
// Esta cogiendo la request del otro main js.
  request.open('POST', 'http://localhost:8000/dias/', true)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(body);
})
