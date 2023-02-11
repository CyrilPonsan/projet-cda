import { HttpErrorResponse } from '@angular/common/http';
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
  @Input() ticket!: Ticket;
  @Input() openedDate!: string;
  showForm!: boolean;
  showModal!: boolean;
  modalError = {
    titre: 'Erreur',
    message: 'Problème serveur, réessayez plus tard...',
    rightBtn: 'Fermer',
  };
  modalSuccess = {
    titre: 'Opération effectuée',
    message: '',
    rightBtn: 'Fermer',
  };
  modal!: any;

  constructor(public tck: TicketsService, public profil: ProfilService) {}

  showFormHandler(): void {
    this.showForm = !this.showForm;
    this.tck.isSidebarOpen = true;
  }

  onSubmitHandler(item: any): void {
    Object.assign(item, { ticket_id: this.ticket.id });
    this.tck.httpAddNewIntervention(item).subscribe({
      next: (response) => this.successHandler(response),
      error: (err) => this.errorHandler(err),
      complete: () => {},
    });
  }

  private successHandler(response: any): void {
    this.modalSuccess.message = response.message;
    this.modal = this.modalSuccess;
    this.showModal = true;
    this.showForm = false;
  }

  private errorHandler(error: any): void {
    if (error instanceof HttpErrorResponse && error.status === 500) {
      this.modal.modalError;
      this.showModal = true;
    }
  }
}
