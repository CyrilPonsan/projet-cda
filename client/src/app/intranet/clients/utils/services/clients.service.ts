import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/intranet/shared/models/models';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClientsService {
  constructor(private http: HttpClient, private pag: PaginationService) {}

  httpGelAllClients(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/clients?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  httpSearchCliebt(
    type: string,
    contratNumber: string
  ): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(
      `${environment.baseUrl}/clients?type=${type}&value`
    );
  }
}
