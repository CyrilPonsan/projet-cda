import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetHomeComponent } from './intranet-home.component';

describe('IntranetHomeComponent', () => {
  let component: IntranetHomeComponent;
  let fixture: ComponentFixture<IntranetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntranetHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntranetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
