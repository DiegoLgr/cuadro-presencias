import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroComponent } from './cuadro.component';

describe('CuadroComponent', () => {
  let component: CuadroComponent;
  let fixture: ComponentFixture<CuadroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuadroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
