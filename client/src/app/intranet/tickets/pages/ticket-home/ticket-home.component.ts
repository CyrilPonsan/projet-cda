import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public pagination: PaginationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagination.page = 1;
    if (!this.tck.statuts) {
      this.tck.httpGetStatuts();
    }
    this.getTickets();
  }

  nextClickHandler(): void {
    this.pagination.page++;
    this.getTickets();
  }

  previousClickHandler(): void {
    this.pagination.page--;
    this.getTickets();
  }

  setLimitHandler(value: any): void {
    this.pagination.page = 1;
    this.pagination.max = value;
    this.getTickets();
  }

  searchSubmitHandler(value: string): void {
    this.router.navigate(['/intranet/tickets', value]);
  }

  private getTickets(): void {
    console.log('page', this.pagination.page);

    this.tck.httpGetTickets().subscribe({
      next: (response) => {
        console.log(response);

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
