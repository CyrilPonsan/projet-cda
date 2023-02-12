import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';
import { Ticket } from '../../utils/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.scss'],
})
export class TicketSummaryComponent {
  @Output() submit = new EventEmitter<any>();
  @Input() ticket!: Ticket;
  @Input() openedDate!: string;
  showForm!: boolean;

  constructor(public tck: TicketsService, public profil: ProfilService) {}

  showFormHandler(): void {
    this.showForm = !this.showForm;
    this.tck.isSidebarOpen = true;
  }

  onSubmitHandler(item: any): void {
    Object.assign(item, { ticket_id: this.ticket.id });
    this.showForm = false;
    this.submit.emit(item);
  }
}
