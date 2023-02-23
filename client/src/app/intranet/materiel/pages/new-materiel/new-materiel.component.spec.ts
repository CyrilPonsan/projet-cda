import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaterielComponent } from './new-materiel.component';

describe('NewMaterielComponent', () => {
  let component: NewMaterielComponent;
  let fixture: ComponentFixture<NewMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
