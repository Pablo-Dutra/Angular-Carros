import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtCarroComponent } from './edt-carro.component';

describe('EdtCarroComponent', () => {
  let component: EdtCarroComponent;
  let fixture: ComponentFixture<EdtCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtCarroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdtCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
