// DATOS.
var workers = ["Juan", "Pepe", "Sebastian"];
var daysShown = 15;
var data = [];
for(i=1; i<=daysShown; i++)
  for(j=0; j<workers.length; j++)
    data.push([workers[j], i]);

var obra = {
  "codigo": 503,
  "nombre": "Dragados Pozuelo"
};

//--------------------------------------------------

var  square = 40,
  padding = 4;

var tableWidth = daysShown * (square + padding) + padding,
  tableHeight = padding + workers.length*(square + padding);
// Font sizes.
var dayLabelsSize = 15,
    monthLabelsSize = 20,
    workerLabelsSize = 17;
    monthLegendSize = monthLabelsSize + 2*padding,

    workerLabelsLength = 150;

var svgWidth = tableWidth + workerLabelsLength,
    svgHeight = tableHeight + monthLegendSize + dayLabelsSize;


// MAQUETADO.
function crearSvg(){
  d3.select("#cuadro-presencias")
  .insert("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("id", "svg");
}

function crearLeyendaMeses(){
  d3.select("#svg")
  .insert("svg")
  .attr("width", tableWidth)
  .attr("height", monthLegendSize)
  .attr("x", workerLabelsLength)
  .attr("id", "monthLegend");
}

function crearLeyendaDias(){
  d3.select("#svg")
  .insert("svg")
  .attr("width", tableWidth)
  .attr("height", dayLabelsSize)
  .attr("x", workerLabelsLength)
  .attr("y", monthLegendSize)
  .attr("id", "daysLegend");
}

function crearLeyendaTrabajadores(){
  d3.select("#svg")
  .insert("svg")
  .attr("width", workerLabelsLength)
  .attr("height", svgHeight)
  .attr("y", monthLegendSize + dayLabelsSize)
  .attr("id", "workers");
}

function crearTabla( ){
  d3.select("#svg")
  .insert("svg")
  .attr("width", tableWidth)
  .attr("height", tableHeight)
  .attr("x", workerLabelsLength + padding)
  .attr("y", monthLegendSize + dayLabelsSize)
  .attr("id", "graph");
}
function crearMaquetado(){
  crearSvg();
  crearLeyendaMeses();
  crearLeyendaDias();
  crearLeyendaTrabajadores();
  crearTabla();
}
//--------------------------------------------------

// CONTENIDO.
// Se añaden divs y parrafos como contenido a cada cuadro.
function crearCuadrados(){
// Se pintan los cuadrados que representan los dias.
  d3.select("#graph")
  .selectAll("squares")
  .data(data).enter()
  .append("svg")
  .attr("width", square)
  .attr("height", square)
  .attr("x", function(d){
    return  padding + (d[1] -1) * (square + padding);
  })
  .attr("y", function(d){
    for (j=0; j<workers.length; j++)
      if (d[0] === workers[j])
        return padding + j*(square + padding);
  });
}

function crearFODias(){
  // Para poder insertar html en el svg.
  d3.select("#graph")
  .selectAll("svg")
  .each(function(){
    d3.select(this)
    .append("foreignObject")
    .attr("width", square)
    .attr("height", square);
  });
}

function crearDivsDias() {
  // divs como anclaje y para dar formato.
  d3.select("#graph").selectAll("foreignObject")
  .append("xhtml:div")
  .attr("class", function(){
    return "day";
   })
  .attr("id", function(d, i){
    return "" + d[0] +"-" + d[1];
  })
  .style("min-width", function(){return ""+square+"px";})
  .style("min-height", function(){return ""+square+"px";});
}

function crearContenedorCodigo(){
  d3.selectAll(".day")
  .each(function(){
    d3.select(this)
    .insert("p")
    .attr("class", function(){return "codigo-obra";})
  });
}

function crearContenedorHoras(){
  d3.selectAll(".day")
    .each(function(){
      d3.select(this)
      .insert("p")
      .attr("class", function(){return "horas-trabajadas";})
    });
}

function rellenarTabla(){
  crearCuadrados();
  crearFODias();
  crearDivsDias();
  crearContenedorCodigo();
  crearContenedorHoras();
}

d3.selectAll(".day")
// // MONT LEGEND.
// var months = ["Junio"];
// var monthLabel = monthLegend.selectAll("text")
//   .data(months).enter()
//   .append("text")
//   .text(function(d){return ""+d+""})
//   .attr("text-anchor", "middle")
//   .attr("x", tableWidth/2)
//   .attr("y", function(){return ""+monthLabelsSize+"px";})
//   .attr("font-size", function(){
//     return "" + monthLabelsSize + "px";
//   });
//
// // DAYS LEGEND.
// var daysList = [];
// for(i=1; i<=daysShown; i++)
//   daysList.push(i);
//
// var dayLabels = daysLegend.selectAll("text")
//   .data(daysList).enter()
//   .append("text")
//   .text(function(d){return "" + d + "";})
//   .attr("x", function(d){
//     return 15 + (d - 1) * (square + padding);
//   })
//   .attr("y", function(){
//     return "" + dayLabelsSize + "px";
//   })
//   .attr("font-size", function(){
//     return "" + dayLabelsSize + "px";
//   });
//
// // LEFT LEGEND.
//  var workerLabels = leftLabels.selectAll("text")
//   .data(workers).enter()
//   .append("text")
//   .attr("id", "workersi")
//   .text(function(d){return d;})
//   .attr("y", function(_,i){
//     return workerLabelsSize +
//       padding + i*(square + padding);
//   })
//   .attr("text-anchor", "end")
//   .attr("x", workerLabelsLength - 10)
//   .attr("font-size", function(){
//     return "" + workerLabelsSize + "px";
//   });
//
crearMaquetado();
rellenarTabla();
// d3.select("#Juan-3 .codigo-obra").text(obra.codigo);
// d3.select("#Juan-3 .horas-trabajadas").text("9");
// d3.select("#Juan-3").style("background", "#9bf");
//
// d3.select("#Juan-4 .codigo-obra").text(obra.codigo);
// d3.select("#Juan-4").style("background", "#9bf");
//
// d3.select("#Juan-5 .codigo-obra").text(obra.codigo);
// d3.select("#Juan-5").style("background", "#9bf");
//
// d3.select("#Juan-7 .codigo-obra").text(obra.codigo);
// d3.select("#Juan-7").style("background", "#9bf");
//
// d3.select("#Pepe-4 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-4").style("background", "#9bf");
//
// d3.select("#Pepe-8 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-8").style("background", "#9bf");
//
// d3.select("#Pepe-9 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-9").style("background", "#9bf");
//
// d3.select("#Pepe-11 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-11").style("background", "#9bf");
//
// d3.select("#Pepe-12 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-12").style("background", "#9bf");
//
// d3.select("#Pepe-13 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-13").style("background", "#9bf");
//
// d3.select("#Pepe-14 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-14").style("background", "#9bf");
//
// d3.select("#Pepe-15 .codigo-obra").text(obra.codigo);
// d3.select("#Pepe-15").style("background", "#9bf");
//
// d3.select("#Sebastian-1 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-1").style("background", "#9bf");
//
// d3.select("#Sebastian-13 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-13").style("background", "#9bf");
//
// d3.select("#Sebastian-14 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-14").style("background", "#9bf");
//
// d3.select("#Sebastian-15 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-15").style("background", "#9bf");
//
// d3.select("#Sebastian-7 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-7").style("background", "#9bf");
//
// d3.select("#Sebastian-8 .codigo-obra").text(obra.codigo);
// d3.select("#Sebastian-8").style("background", "#9bf");
