class ConstructionsView{
  constructor(){
    this.controler = new ConstructionControler();
  }
  showConstructions(){
    this.controler.getConstructions()
    .then(response => this._appendList(response));
  }
  _appendList(response){
    let list = document.getElementById("constructions-list")

    response.forEach(construction =>{
      let constructionDivStr = this._makeConstructionDiv(construction);
      let constructionLi = document.createElement('li');
      constructionLi.setAttribute('class', "hola-li")
      constructionLi.innerHTML = constructionDivStr;
      list.appendChild(constructionLi);
    })
  }
  _makeConstructionDiv(construction){
    let nombre = construction.nombre;
    let codigo = construction.codigo;
    let color = construction.color;
    let result = `
    <div class="construction-div" style="background-color: ${color};">
    <span>${nombre}</span>
    <span>${codigo}</span>
    </div>
    `;
    return result;
  }
}
