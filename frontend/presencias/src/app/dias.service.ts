import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'

@Injectable()
export class DiasService {

  constructor() { }

  getDias(): Observable<number>{
    return of(5);
  }
}
