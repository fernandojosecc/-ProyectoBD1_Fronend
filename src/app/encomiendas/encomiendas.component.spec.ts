import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomiendasComponent } from './encomiendas.component';

describe('EncomiendasComponent', () => {
  let component: EncomiendasComponent;
  let fixture: ComponentFixture<EncomiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncomiendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
