import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseillerFormComponent } from './conseiller-form.component';

describe('ConseillerFormComponent', () => {
  let component: ConseillerFormComponent;
  let fixture: ComponentFixture<ConseillerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConseillerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConseillerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
