import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstCarroComponent } from './lst-carro.component';

describe('LstCarroComponent', () => {
  let component: LstCarroComponent;
  let fixture: ComponentFixture<LstCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstCarroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LstCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
