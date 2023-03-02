import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Conseiller from '../models/conseiller.model';
import { ProfilService } from './profil.service';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private profil: ProfilService
  ) {}

  httpConnexion(username: string, password: string): void {
    this.http
      .post<any>(`${environment.baseUrl}/auth/`, {
        username,
        password,
      })
      .subscribe({
        next: (response) => {
          this.profil.user = response.user;
          this.saveTokens(response.accessToken, response.refreshToken);
        },
        error: (err) => console.log(err),
        complete: () => this.router.navigateByUrl('intranet'),
      });
  }

  httpGenerateTokens(): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/refresh-tokens`, {
      refreshToken: sessionStorage.getItem('refreshToken'),
    });
  }

  logout(): void {
    this.profil.user = <Conseiller>{};
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    this.router.navigateByUrl('/');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  async httpHandshake(): Promise<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/auth/handshake`
    ); /* .subscribe({
      next: (response) => {
        this.profil.user = response.user;
      },
      error: (err) => {
        console.log(err);
        this.logout();
      },
      complete: () => [],
    }); */
  }
}
