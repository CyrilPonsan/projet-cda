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
  @Output() reload = new EventEmitter<void>();
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
    this.tck.httpAddNewIntervention(item);
    this.showForm = false;
    this.reload.emit();
  }
}
