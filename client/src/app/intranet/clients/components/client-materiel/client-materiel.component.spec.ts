import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMaterielComponent } from './client-materiel.component';

describe('ClientMaterielComponent', () => {
  let component: ClientMaterielComponent;
  let fixture: ComponentFixture<ClientMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
