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
  showForm!: boolean;

  constructor(public tck: TicketsService) {}

  showFormHandler(): void {
    console.log(this.ticket);

    this.showForm = !this.showForm;
  }

  onSubmitHandler(item: any): void {
    console.log('hello');

    Object.assign(item, { ticket_id: this.ticket.id });
    this.tck.httpAddNewIntervention(item).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
