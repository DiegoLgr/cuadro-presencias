// DATOS.
var workers = ["Juan", "Pepe", "Sebastian"];
var daysShown = 20;
var data = [];
for(i=1; i<=daysShown; i++)
  for(j=0; j<workers.length; j++)
    data.push([workers[j], i]);


var  square = 40,
  padding = 4;

var tableWidth = daysShown * (square + padding) + padding,
  tableHeight = padding + workers.length*(square + padding);
// Font sizes.
var dayLabelsSize = 15,
    monthLabelsSize = 20,
    workerLabelsSize = 17;
    monthLegendSize = monthLabelsSize + 2*padding;

    workerLabelsLength = 150,

var svgWidth = tableWidth + workerLabelsLength,
    svgHeight = tableHeight + monthLegendSize + dayLabelsSize;


// SVG.
var svg = d3.select("#cuadro-presencias").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "svg")

var monthLegend = svg.append("svg")
  .attr("width", tableWidth)
  .attr("height", monthLegendSize)
  .attr("x", workerLabelsLength)
  .attr("id", "monthLegend");

var daysLegend = svg.append("svg")
  .attr("width", tableWidth)
  .attr("height", dayLabelsSize)
  .attr("x", workerLabelsLength)
  .attr("y", monthLegendSize)
  .attr("id", "daysLegend");

var leftLabels = svg.append("svg")
  .attr("width", workerLabelsLength)
  .attr("height", svgHeight)
  .attr("y", monthLegendSize + dayLabelsSize)
  .attr("id", "workers");

// TABLE.
var daysSquare = svg.selectAll("squares")
  .data(data).enter()
  .append("rect")
  .attr("class", function(d, i){
     return "day %" + d[0] +"%" + d[1];
   })
  .attr("width", square)
  .attr("height", square)
  .attr("x", function(d){
    return workerLabelsLength + padding
      + (d[1] -1) * (square + padding);
  })
  .attr("y", function(d){
    for (j=0; j<workers.length; j++)
      if (d[0] === workers[j])
        return monthLegendSize + dayLabelsSize +
          padding + j*(square + padding);
  });

// MONT LEGEND.
var months = ["Junio"];
var monthLabel = monthLegend.selectAll("text")
  .data(months).enter()
  .append("text")
  .text(function(d){return ""+d+""})
  .attr("text-anchor", "middle")
  .attr("x", tableWidth/2)
  .attr("y", function(){return ""+monthLabelsSize+"px";})
  .attr("font-size", function(){
    return "" + monthLabelsSize + "px";
  });

// DAYS LEGEND.
var daysList = [];
for(i=1; i<=daysShown; i++)
  daysList.push(i);

var dayLabels = daysLegend.selectAll("text")
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

// LEFT LEGEND.
 var workerLabels = leftLabels.selectAll("text")
  .data(workers).enter()
  .append("text")
  .attr("id", "workersi")
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
