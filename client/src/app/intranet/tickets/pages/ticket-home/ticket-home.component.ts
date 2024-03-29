import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';
import { fade } from 'src/app/intranet/shared/animations/animations';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { Ticket } from '../../../shared/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.scss'],
  animations: [fade],
})
export class TicketHomeComponent implements OnInit {
  tickets!: Array<Ticket>;

  constructor(
    public tck: TicketsService,
    public pagination: PaginationService,
    private router: Router,
    private profil: ProfilService
  ) {}

  ngOnInit(): void {
    console.log(this.profil.user);

    this.pagination.page = 1;
    if (!this.tck.statuts) {
      this.tck.httpGetStatuts();
    }
    this.getTickets();
  }

  pageChangedHandler(): void {
    this.getTickets();
  }

  setLimitHandler(value: any): void {
    this.pagination.max = value;
    this.getTickets();
  }

  searchSubmitHandler(value: string): void {
    this.router.navigate(['/intranet/tickets', value]);
  }

  private getTickets(): void {
    this.tck.httpGetTickets().subscribe({
      next: (response) => {
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
