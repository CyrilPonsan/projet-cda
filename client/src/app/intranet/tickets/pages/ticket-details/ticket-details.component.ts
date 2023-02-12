import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/intranet/shared/animations/animations';
import { Intervention, Ticket } from '../../../shared/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  animations: [fade],
})
export class TicketDetailsComponent implements OnInit {
  ticket!: Ticket;
  interventions!: Intervention[] | undefined;
  openedDate!: string;
  showModal!: boolean;
  modal = {
    titre: 'Ressource inexistante',
    message: "Aucun ticket n'a été trouvé pour cette référence",
    rightBtn: 'Retour aux tickets',
  };

  constructor(
    public ticketsService: TicketsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //  récupération de la réf du ticket dans l'url
  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    //  si la réf est présente, récupération du ticket associé à cette réf
    if (ref) {
      this.getTicketDetail(ref);
    }
  }

  //  redirection vers la page d'accueil des tickets
  modalRightBtnHandler(): void {
    this.showModal = false;
    this.router.navigateByUrl('/intranet/tickets');
  }

  //  affiche la sidebar
  showSidebarHandler(): void {
    this.ticketsService.isSidebarOpen = true;
  }

  //  cache la sidebar
  closeSidebarHandler(): void {
    this.ticketsService.isSidebarOpen = false;
  }

  reloadHandler(): void {
    this.getTicketDetail(this.ticket.ref);
  }

  addNewIntervention(item: any): void {
    this.ticketsService.httpAddNewIntervention(item).subscribe({
      next: (response) => {
        this.getTicketDetail(this.ticket.ref);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 418) {
          this.ticketsService.modalError.message = err.error.error;
          this.ticketsService.modal = this.ticketsService.modalError;
          this.ticketsService.showModal = true;
        }
      },
      complete: () => {},
    });
  }

  private getTicketDetail(ref: string): void {
    this.ticketsService.httpGetTicketDetail(ref).subscribe({
      next: (response) => {
        this.ticket = response;
        this.interventions = this.ticket.intervention;
        if (this.interventions?.length !== 0) {
          this.openedDate =
            this.interventions![this.interventions!.length - 1].date;
        }
      },
      //  si la ref n'existe pas dans la bdd: ouverture d'une modal pour prévenir l'utilisateur et revenir à la page d'accueil des tickets
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 404) {
          this.showModal = true;
        }
      },
      complete: () => {},
    });
  }
}
