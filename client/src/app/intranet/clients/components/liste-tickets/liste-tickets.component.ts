import { Component, Input } from '@angular/core';
import { ClientTicket } from '../../utils/models/models';

@Component({
  selector: 'app-liste-tickets',
  templateUrl: './liste-tickets.component.html',
  styleUrls: ['./liste-tickets.component.scss'],
})
export class ListeTicketsComponent {
  @Input() listeTickets!: Array<ClientTicket>;
}
