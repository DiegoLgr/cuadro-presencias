

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
asignarForm.addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = asignarForm
    .querySelector("#nombre")
    .value

  const dias = asignarForm
    .querySelector("#dia")
    .value

  const horas = asignarForm
    .querySelector("#horas")
    .value

  const obra = asignarForm
    .querySelector("#obra")
    .value
  obras
  trabajadores.asignarTrabajo(
    nombre, dias, horas, obras[obra])
  cuadro.actualizarCuadro()
})
