import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseillerRechercheComponent } from './conseiller-recherche.component';

describe('ConseillerRechercheComponent', () => {
  let component: ConseillerRechercheComponent;
  let fixture: ComponentFixture<ConseillerRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConseillerRechercheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConseillerRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
