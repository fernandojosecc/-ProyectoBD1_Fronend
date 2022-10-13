import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarreservacionesComponent } from './realizarreservaciones.component';

describe('RealizarreservacionesComponent', () => {
  let component: RealizarreservacionesComponent;
  let fixture: ComponentFixture<RealizarreservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarreservacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarreservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
