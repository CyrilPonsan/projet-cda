import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { Statut, Ticket } from '../models/models';

@Injectable()
export class TicketsService {
  statuts!: Array<Statut>;

  constructor(private http: HttpClient, private pag: PaginationService) {}

  httpGetTickets(): Observable<any> {
    console.log(this.pag.page);

    return this.http.get<any>(
      `${environment.baseUrl}/tickets?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  httpGetStatuts(): void {
    this.http.get<any>(`${environment.baseUrl}/tickets/statuts`).subscribe({
      next: (response) => (this.statuts = response.data),
      error: (err) => console.log(err),
      complete: () => {
        console.log('done');
        console.table(this.statuts);
      },
    });
  }

  httpGetTicketDetail(ref: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${environment.baseUrl}/tickets/details/${ref}`
    );
  }
}
