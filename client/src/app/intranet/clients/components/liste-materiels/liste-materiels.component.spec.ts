import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMaterielsComponent } from './liste-materiels.component';

describe('ListeMaterielsComponent', () => {
  let component: ListeMaterielsComponent;
  let fixture: ComponentFixture<ListeMaterielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMaterielsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
