import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielHomeComponent } from './materiel-home.component';

describe('MaterielHomeComponent', () => {
  let component: MaterielHomeComponent;
  let fixture: ComponentFixture<MaterielHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
