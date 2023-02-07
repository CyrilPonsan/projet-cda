import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { Statut, Ticket } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  tickets!: Array<Ticket>;
  statuts!: Array<Statut>;

  constructor(
    private http: HttpClient,
    private pagination: PaginationService
  ) {}

  httpGetTickets(): void {
    this.http.get<any>(`${environment.baseUrl}/tickets/`).subscribe({
      next: (response) => {
        this.pagination.page = 1;
        this.pagination.total = response.total;
        this.tickets = response.data;
        this.pagination.setButtonsStyle(response.data.length);
      },
      error: (err) => console.log(err),
      complete: () => console.log('done'),
    });
  }

  httpGetStatuts(): void {
    this.http
      .get<Array<Statut>>(`${environment.baseUrl}/tickets/statuts`)
      .subscribe({
        next: (response) => (this.statuts = response),
        error: (err) => console.log(err),
        complete: () => {
          console.log('done');
        },
      });
  }
}
