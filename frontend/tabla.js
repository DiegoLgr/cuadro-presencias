function Cuadro(){
  /* INTERFAZ:
      setRangoDias(*)
      setTrabajadores(listaTrabajadores: [str])
      construirCuadro()
      rellenarDia(nombre, fecha, horas, color, codigo))
  */
    let primerDia = new Date()
    let ultimoDia = new Date()
    let trabajadores = []
    let that = this

    // PRIVADO.
    function calcularDias(){
      // Horas * minuto * segundos * milisegundos.
      let unDia = 24 * 60 * 60 * 1000;
      let numeroDias = Math.round(Math.abs(
        (primerDia.getTime() - ultimoDia.getTime())/(unDia)));
      return numeroDias + 1 // +1 -> Ambos incluidos
    }
    function añadirDias(){
      trabajadores.forEach((trabajador)=>{
        filaTrabajador = d3.select('#'+trabajador)
        filaTrabajador.append('td')
          .text(trabajador)
          .attr('class', 'nombre')
        diasMostrados = calcularDias()
        let siguiente = new Date()
        for (let dia=0; dia < diasMostrados; dia++){
          siguiente.setDate(primerDia.getDate()+dia)
          let cuadroActual = filaTrabajador
          .append('td')
          .attr("class", "dia")
          .attr("id", ()=>{
            // Para poner el id hay que dar formato a la fecha.
            let d = siguiente.getDate()
            let m = siguiente.getMonth() + 1
            let a = siguiente.getFullYear()
            let fecha = [a,
                         (m > 9 ? "" : '0') + m,
                         (d > 9 ? "" : '0') + d
                       ].join('-')
            return trabajador + "-" +fecha
      })
      cuadroActual.append('span')
      .attr('class', 'codigo-obra')
      cuadroActual.append('br')
      cuadroActual.append('span')
      .attr('class', 'horas-trabajadas')
      }})
    }
    // PUBLICO.
    this.setRangoDias = function(){
      primerDia = new Date("2018-05-01")
      ultimoDia = new Date("2018-05-20")
    }
    this.setTrabajadores = function(listaTrabajadores){
      listaTrabajadores.forEach((trabajador)=>{
        trabajadores.push(trabajador)
      })
    }
    this.construirCuadro = function(){
      let tabla = d3.select('#tabla')
      // Fila del mes
      primeraFila = tabla.append('tr')
      primeraFila.append('td')
      primeraFila.append('td')
        .text('Junio')
        .attr('id', 'mes')
        .attr('colspan', ()=>calcularDias())
      // Numeracion dias.
      let segundaFila = tabla.append('tr')
      segundaFila.append('td')
      let diasMostrados = calcularDias()
      let siguiente = new Date()
      for (let dia=0; dia<diasMostrados; dia++){
        segundaFila.append('td')
        .attr('class', 'numero-dia')
        .text(()=>{
            siguiente.setDate(primerDia.getDate() + dia)
            return siguiente.getDate()
        })
      }
      // Una fila por cada trabajador
      trabajadores.forEach((trabajador)=>{
        tabla.append('tr')
        .attr("id", ()=>trabajador)
      })
      // Añade los dias a cada trabajador
      añadirDias()
    }
    this.rellenarDia = function(
      nombre, fecha, horas, color, codigo){
      let selector = '#' + nombre + '-' + fecha
      d3.select(selector + " .codigo-obra")
        .text(String(codigo))
      d3.select(selector + " .horas-trabajadas")
        .text(String(horas))
      d3.select(selector)
        .style("background", color)
    }
}
