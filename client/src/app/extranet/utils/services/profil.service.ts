import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Conseiller from '../models/conseiller.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  user!: Conseiller;
  userList!: Array<Conseiller>;

  constructor(private http: HttpClient) {}

  httpGetUserList(): Observable<Array<Conseiller>> {
    return this.http.get<Array<Conseiller>>(
      `${environment.baseUrl}/conseillers/`
    );
  }

  httpDeleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/conseillers/${id}`);
  }

  httpCreateUser(conseiller: Conseiller): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/conseillers`,
      conseiller
    );
  }

  httpGetConseillerDetail(id: string): Observable<Conseiller> {
    return this.http.get<Conseiller>(
      `${environment.baseUrl}/conseillers/${id}`
    );
  }

  httpUpdateConseiller(conseiller: Conseiller): Observable<any> {
    return this.http.put(`${environment.baseUrl}/conseillers/`, conseiller);
  }
}
