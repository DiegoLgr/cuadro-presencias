class ConstructionControler{
  constructor(){
  }
  _fetchFromApi(){
    let request = new XMLHttpRequest()
    return new Promise((resolve, reject)=>{
      request.onreadystatechange = ()=>
        this._resolveRequest(resolve, reject, request);
      request.open('GET', 'http://localhost:8000/obras/', true);
      request.send(null);
    })
  }
  _resolveRequest(resolve, reject, request){
    if (request.readyState == 4)
      if (request.status == 200){
        resolve(request);
      }
      else{
        reject("Se jodio.");
      }
  }
  getConstructions(){
    let response =  this._fetchFromApi()
      .then(request => JSON.parse(request.response));
    return response;
  }
}
