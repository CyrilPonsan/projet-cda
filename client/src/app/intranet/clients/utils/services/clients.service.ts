import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/intranet/shared/models/models';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { ClientTicket, Inventaire } from '../models/models';

@Injectable()
export class ClientsService {
  client!: Client | null;

  constructor(private http: HttpClient, private pag: PaginationService) {}

  //  retourne la liste des clients en incluant la pagination
  httpGelAllClients(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/clients?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  //  retourne la liste de tous les clients
  httpGetClients(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/clients/clients`);
  }

  //  recherche un client par son numéro de contrat ou par son nom
  httpSearchClients(type: string, value: string): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(
      `${environment.baseUrl}/clients/search?type=${type}&value=${value}`
    );
  }

  //  retourne la liste de toutes les raisons sociales
  httpGetRaisonsSociales(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/clients/raisons-sociales`
    );
  }

  //  enregistre une nouvelle raison sociale dans la bdd
  httpAddRaisonSociale(raisonSociale: string): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/clients/raisons-sociales`,
      { raisonSociale }
    );
  }

  //  enregistre un nouveau client dans la bdd
  httpCreateClient(client: Client): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/clients`, { client });
  }

  //  met à jour un client
  httpUpdateClient(client: Client, clientId: number): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/clients/${clientId}`, {
      client,
    });
  }

  //  retourne la liste des tickets créés pour un client
  httpGetClientTickets(clientId: number): Observable<Array<ClientTicket>> {
    return this.http.get<Array<ClientTicket>>(
      `${environment.baseUrl}/clients/tickets/${clientId}`
    );
  }

  //  retourne le parc informatique d'un client
  httpGetClientMateriels(clientId: number): Observable<Array<Inventaire>> {
    return this.http.get<Array<Inventaire>>(
      `${environment.baseUrl}/clients/materiels/${clientId}`
    );
  }
}
