let controlador = new ControladorCuadro()
controlador.CargarDatosYPintar()
// Añadir y mostrar trabajadores.
let mostrandoFormAnadir = false
botonAnadirTrabajador = document.getElementById('anadirTrabajador')
botonAnadirTrabajador.addEventListener('click',
  (e)=>mostrandoFormAnadir = controlador.mostrarFormAnadirTrabajadores(mostrandoFormAnadir))
// let mostrandoTrabajadores = false
// botonMostrarTrabajadores = document.getElementById('mostrar-trabajadores')
// botonMostrarTrabajadores.addEventListener('click',(e)=>controlador.mostrarTrabajadores())
controlador.mostrarTrabajadores();
let constructions = new ConstructionsView();
constructions.showConstructions();
