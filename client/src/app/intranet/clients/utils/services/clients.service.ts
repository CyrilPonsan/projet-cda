import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client, Ticket } from 'src/app/intranet/shared/models/models';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { ClientTicket, Inventaire } from '../models/models';

@Injectable()
export class ClientsService {
  client!: Client;

  constructor(
    private http: HttpClient,
    private pag: PaginationService,
    private router: Router
  ) {}

  httpGelAllClients(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/clients?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  httpSearchClients(type: string, value: string): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(
      `${environment.baseUrl}/clients/search?type=${type}&value=${value}`
    );
  }

  httpGetRaisonsSociales(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/clients/raisons-sociales`
    );
  }

  httpAddRaisonSociale(raisonSociale: string): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/clients/raisons-sociales`,
      { raisonSociale }
    );
  }

  httpCreateClient(client: Client): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/clients`, { client });
  }

  httpUpdateClient(client: Client, clientId: number): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/clients/${clientId}`, {
      client,
    });
  }

  httpGetClientTickets(clientId: number): Observable<Array<ClientTicket>> {
    return this.http.get<Array<ClientTicket>>(
      `${environment.baseUrl}/clients/tickets/${clientId}`
    );
  }

  httpGetClientMateriels(clientId: number): Observable<Array<Inventaire>> {
    return this.http.get<Array<Inventaire>>(
      `${environment.baseUrl}/clients/materiels/${clientId}`
    );
  }
}
