import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelCarroComponent } from './del-carro.component';

describe('DelCarroComponent', () => {
  let component: DelCarroComponent;
  let fixture: ComponentFixture<DelCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelCarroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
