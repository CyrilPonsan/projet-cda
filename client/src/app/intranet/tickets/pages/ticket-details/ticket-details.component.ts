import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervention, Ticket } from '../../utils/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
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
    private ticketsService: TicketsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    if (ref) {
      this.ticketsService.httpGetTicketDetail(ref!).subscribe({
        next: (response) => {
          this.ticket = response;
          this.interventions = this.ticket.intervention;
          if (this.interventions?.length !== 0) {
            this.openedDate = this.interventions![0].date;
          }
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            this.showModal = true;
          }
        },
        complete: () => {},
      });
    }
  }

  modalRightBtnHandler(): void {
    this.showModal = false;
    this.router.navigateByUrl('/intranet/tickets');
  }
}
