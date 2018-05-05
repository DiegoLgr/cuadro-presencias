// Todo esto deberia hacerlo el controlador con los
// datos de la API
let trabajadores = new Trabajadores()
trabajadores.anadirTrabajador("Pepe")
trabajadores.anadirTrabajador("Juan")
trabajadores.anadirTrabajador("Sebastian")

trabajadores.asignarTrabajo("Pepe", "2018-05-01", 5, "#6c8", 509)
trabajadores.asignarTrabajo("Pepe", "2018-05-02", 8, "#6c8", 509)
trabajadores.asignarTrabajo("Juan", "2018-05-01", 9, "#6c8", 509)
trabajadores.asignarTrabajo("Juan", "2018-05-08", 9, "#6c8", 509)
trabajadores.asignarTrabajo("Sebastian", "2018-05-01", 8, "#6c8", 509)
trabajadores.asignarTrabajo("Sebastian", "2018-05-15", 8, "#6c8", 509)

cuadro = new ControladorCuadro(trabajadores)
cuadro.pintarCuadro()
