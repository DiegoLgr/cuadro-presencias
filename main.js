// import pintarCuadro from './tabla-presencias';

pintarCuadro();

function asignarTrabajo(nombre, dia, colorObra, codigoObra, horas){
  var selector = "#"+ nombre +"-"+ dia;
  d3.select(selector + " .codigo-obra")
    .text(String(codigoObra));
  d3.select(selector + " .horas-trabajadas")
    .text(String(horas));
  d3.select(selector)
    .style("background", colorObra);
}


asignarTrabajo("Juan", 3, "#6c8", 509, 9);
asignarTrabajo("Juan", 4, "#6c8", 509, 9);
asignarTrabajo("Juan", 5, "#6c8", 509, 9);
asignarTrabajo("Juan", 6, "#6c8", 509, 9);
asignarTrabajo("Juan", 7, "#6c8", 509, 9);
asignarTrabajo("Juan", 10, "#6c8", 509, 9);
asignarTrabajo("Juan", 11, "#6c8", 509, 9);
asignarTrabajo("Juan", 12, "#6c8", 509, 9);
asignarTrabajo("Juan", 13, "#6c8", 509, 9);
asignarTrabajo("Juan", 14, "#6c8", 509, 9);

asignarTrabajo("Pepe", 1, "#ffd700", 521, 9);
asignarTrabajo("Pepe", 3, "#6c8", 509, 9);
asignarTrabajo("Pepe", 4, "#6c8", 509, 9);
asignarTrabajo("Pepe", 5, "#6c8", 509, 9);
asignarTrabajo("Pepe", 6, "#6c8", 509, 9);
asignarTrabajo("Pepe", 7, "#6c8", 509, 9);
asignarTrabajo("Pepe", 10, "#8bf", 503, 9);
asignarTrabajo("Pepe", 11, "#8bf", 503, 9);
asignarTrabajo("Pepe", 12, "#8bf", 503, 9);
asignarTrabajo("Pepe", 13, "#8bf", 503, 9);

asignarTrabajo("Sebastian", 3, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 4, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 5, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 6, "#8bf", 503, 9);
asignarTrabajo("Sebastian", 7, "#8bf", 503, 9);
asignarTrabajo("Sebastian", 10, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 11, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 12, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 13, "#6c8", 509, 9);
asignarTrabajo("Sebastian", 14, "#6c8", 509, 9);
