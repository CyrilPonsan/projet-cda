import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
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
        this.pagination.setPagesMax(response.total);
        this.pagination.setButtonsStyle(response.data.length);
        this.tickets = response.data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('done'),
    });
  }
}
