import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CuadroComponent } from './cuadro/cuadro.component';
import { DiasService } from  './dias.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CuadroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DiasService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
