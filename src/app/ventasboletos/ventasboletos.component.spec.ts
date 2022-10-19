import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasboletosComponent } from './ventasboletos.component';

describe('VentasboletosComponent', () => {
  let component: VentasboletosComponent;
  let fixture: ComponentFixture<VentasboletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasboletosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasboletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
