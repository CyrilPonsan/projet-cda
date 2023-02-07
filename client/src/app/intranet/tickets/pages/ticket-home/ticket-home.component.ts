import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { Ticket } from '../../utils/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.scss'],
})
export class TicketHomeComponent implements OnInit {
  tickets!: Array<Ticket>;

  constructor(
    public tck: TicketsService,
    public pagination: PaginationService
  ) {}

  ngOnInit(): void {
    if (!this.tck.statuts) {
      this.tck.httpGetStatuts();
    }
    this.tck.httpGetTickets().subscribe({
      next: (response) => {
        this.pagination.page = 1;
        this.pagination.total = response.total;
        this.tickets = response.data.map((item: any) => {
          return {
            id: item.id,
            ref: item.ref,
            client: item.materiel.client,
            materiel: item.materiel,
            titre: item.titre,
            resume: item.resume,
            code: item.code,
            date: item.date,
          };
        });
        this.pagination.setButtonsStyle(response.data.length);
      },
      error: (err) => console.log(err),
      complete: () => console.log('done'),
    });
  }
}
