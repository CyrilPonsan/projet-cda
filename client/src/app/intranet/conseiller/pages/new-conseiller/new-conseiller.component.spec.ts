import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConseillerComponent } from './new-conseiller.component';

describe('NewConseillerComponent', () => {
  let component: NewConseillerComponent;
  let fixture: ComponentFixture<NewConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConseillerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
