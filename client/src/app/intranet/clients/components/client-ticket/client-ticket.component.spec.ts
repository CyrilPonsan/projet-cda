import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTicketComponent } from './client-ticket.component';

describe('ClientTicketComponent', () => {
  let component: ClientTicketComponent;
  let fixture: ComponentFixture<ClientTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
