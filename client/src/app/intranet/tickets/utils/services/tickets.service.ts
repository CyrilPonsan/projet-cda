import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { Statut, Ticket } from '../models/models';

@Injectable()
export class TicketsService {
  statuts!: Array<Statut>;
  isSidebarOpen!: boolean;
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

  constructor(private http: HttpClient, private pag: PaginationService) {}

  httpGetTickets(): Observable<any> {
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
      },
    });
  }

  httpGetTicketDetail(ref: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${environment.baseUrl}/tickets/details/${ref}`
    );
  }

  httpAddNewIntervention(item: any): Observable<string> {
    return this.http
      .post<any>(`${environment.baseUrl}/tickets/new-intervention`, { item })
      .pipe(
        tap((response) => {
          if (response) {
            this.successHandler(response);
          } else {
            this.errorHandler();
          }
        })
      );
  }

  private successHandler(response: any): void {
    this.modalSuccess.message = response.message;
    this.modal = this.modalSuccess;
    this.showModal = true;
  }

  private errorHandler(): void {
    this.modal.modalError;
    this.showModal = true;
  }
}
