import { Component, OnInit } from '@angular/core';
import { DiasService } from '../dias.service';

@Component({
  selector: 'app-cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent implements OnInit {

  getDias(): void {
    this.diasService.getDias()
    .subscribe(data => console.log(data))
  }
  constructor(
  private diasService: DiasService
  ){}
  ngOnInit() {
    this.getDias();
  }

}
