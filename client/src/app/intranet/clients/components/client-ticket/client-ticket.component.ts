import { Component, Input } from '@angular/core';
import { ClientTicket } from '../../utils/models/models';

@Component({
  selector: 'app-client-ticket',
  templateUrl: './client-ticket.component.html',
  styleUrls: ['./client-ticket.component.scss'],
})
export class ClientTicketComponent {
  @Input() ticket!: ClientTicket;
}
