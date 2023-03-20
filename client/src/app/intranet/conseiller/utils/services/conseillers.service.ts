import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConseillersService {
  conseiller!: Conseiller;

  constructor
  (
    private http: HttpClient,
    private pag: PaginationService,
    private router: Router
  ) { }

  httpGelAllConseillers(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/conseillers?page=${this.pag.page}&lmt=${this.pag.max}`
    );
  }

  httpSearchConseillers(type: string, value: string): Observable<Array<Conseiller>> {
    return this.http.get<Array<Conseiller>>(
      `${environment.baseUrl}/clients/search?type=${type}&value=${value}`
    );
  }

  httpCreateConseiller(conseiller: Conseiller): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/conseillers`, { conseiller });
  }

  httpUpdateConseiller(conseiller: Conseiller, conseillerId: number): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/conseillers/${conseillerId}`, {
      conseiller,
    });
  }

}
