import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConseillerComponent } from './edit-conseiller.component';

describe('EditConseillerComponent', () => {
  let component: EditConseillerComponent;
  let fixture: ComponentFixture<EditConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConseillerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
