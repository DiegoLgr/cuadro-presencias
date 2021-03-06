// Para crear el cuadro basta con llamar a pintarCuadro().
// (Esta al final del arcivo).

// DATOS.
function CuadroPresencias (){
  this.workers = []
  let daysShown = 31;
  let daysList = [];
  for(i=1; i<=daysShown; i++)
    daysList.push(i);

  let data = [];
  let  square = 40,
    padding = 4;

  let tableWidth = daysShown * (square + padding) + padding
  let tableHeight = 0;
  // Font sizes.
  let dayLabelsSize = 15,
      monthLabelsSize = 20,
      workerLabelsSize = 17;
      monthLegendSize = monthLabelsSize + 2*padding,

      workerLabelsLength = 150;

   let svgWidth = tableWidth + workerLabelsLength
      svgHeight = 0;
 let that = this
//--------------------------------------------------
function creaDatos(){
   datos = []
  for(i=1; i<=daysShown; i++)
    for(j=0; j<that.workers.length; j++)
      datos.push([that.workers[j], i]);
  return datos
  }

function calculoAltoTabla(){
  return padding + that.workers.length*(square + padding);
}
function calculoAltoSvg(){
  return tableHeight + monthLegendSize + dayLabelsSize
}
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
    .attr("id", "workersLegend");
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
      for (j=0; j<that.workers.length; j++)
        if (d[0] === that.workers[j])
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

  // LEYENDAS
  var months = ["Junio"];
  function rellenarLeyendaMeses(){
     d3.select("#monthLegend")
     .selectAll("text")
    .data(months).enter()
    .append("text")
    .text(function(d){return ""+d+""})
    .attr("text-anchor", "middle")
    .attr("x", tableWidth/2)
    .attr("y", function(){return ""+monthLabelsSize+"px";})
    .attr("font-size", function(){
      return "" + monthLabelsSize + "px";
    });
  }

  function rellenarLeyendaDias(){
    d3.select("#daysLegend")
    .selectAll("text")
    .data(daysList).enter()
    .append("text")
    .text(function(d){return "" + d + "";})
    .attr("x", function(d){
      return 15 + (d - 1) * (square + padding);
    })
    .attr("y", function(){
      return "" + dayLabelsSize + "px";
    })
    .attr("font-size", function(){
      return "" + dayLabelsSize + "px";
    });
  }

  function rellenarLeyendaTrabajadores(){
    d3.select("#workersLegend").selectAll("text")
    .data(that.workers).enter()
    .append("text")
    .attr("id", "worker")
    .text(function(d){return d;})
    .attr("y", function(_,i){
      return workerLabelsSize +
        padding + i*(square + padding);
    })
    .attr("text-anchor", "end")
    .attr("x", workerLabelsLength - 10)
    .attr("font-size", function(){
      return "" + workerLabelsSize + "px";
    });
  }


  this.asignarTrabajo = function(nombre,
                  dia, horas,  colorObra, codigoObra){
    var selector = "#"+ nombre +"-"+ dia;
    d3.select(selector + " .codigo-obra")
      .text(String(codigoObra));
    d3.select(selector + " .horas-trabajadas")
      .text(String(horas));
    d3.select(selector)
      .style("background", colorObra);
  }
  //##################################################
  // Funcion final
  this.pintarCuadro = function(trabajadores){
    this.workers = trabajadores
    data = creaDatos()
    tableHeight = calculoAltoTabla()
    svgHeight = calculoAltoSvg()
    crearSvg();
    crearLeyendaMeses();
    crearLeyendaDias();
    crearLeyendaTrabajadores();
    crearTabla();
    rellenarTabla();
    rellenarLeyendaMeses();
    rellenarLeyendaDias();
    rellenarLeyendaTrabajadores();
  }
}
  //##################################################
