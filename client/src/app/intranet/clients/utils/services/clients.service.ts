import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/intranet/shared/models/models';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClientsService {
  client!: Array<Client>;

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

  httpSearchClients(type: string, value: string) {
    this.http
      .get<Array<Client>>(
        `${environment.baseUrl}/clients/search?type=${type}&value=${value}`
      )
      .subscribe({
        next: (response) => (this.client = response),
        error: (err) => console.log(err),
        complete: () => {
          if (type === 'contrat') {
            this.router.navigate(['/intranet/clients/detail/', value]);
          }
        },
      });
  }
}