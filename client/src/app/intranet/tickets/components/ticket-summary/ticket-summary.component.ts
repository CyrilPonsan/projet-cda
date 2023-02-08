import { Component, Input } from '@angular/core';
import { Ticket } from '../../utils/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.scss'],
})
export class TicketSummaryComponent {
  @Input() ticket!: Ticket;
  @Input() openedDate!: string;

  constructor(public tck: TicketsService) {}
}
