import { Component, OnInit } from '@angular/core';
import { DiasService } from '../dias.service';

@Component({
  selector: 'app-cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent implements OnInit {

  prueba :number = 0;
  getDias(): void {
    this.diasService.getDias().subscribe(numero => this.prueba = numero);
  }
  constructor( private diasService : DiasService){ }
  ngOnInit() {
    this.getDias();
  }

}
