import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DiasService {

  constructor(
    private http: HttpClient
  ) {}

   private backendUrl = 'http://localhost:8000/dias/'

   getDias(){
     return this.http.get(this.backendUrl)
   }
}
