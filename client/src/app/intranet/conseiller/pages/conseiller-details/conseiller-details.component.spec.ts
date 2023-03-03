import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseillerDetailsComponent } from './conseiller-details.component';

describe('ConseillerDetailsComponent', () => {
  let component: ConseillerDetailsComponent;
  let fixture: ComponentFixture<ConseillerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConseillerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConseillerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
