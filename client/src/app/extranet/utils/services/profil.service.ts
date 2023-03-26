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
}
