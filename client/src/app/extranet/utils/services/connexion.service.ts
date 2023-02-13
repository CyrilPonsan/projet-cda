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
  accessToken!: string;
  refreshToken!: string;

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
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;
        },
        error: (err) => console.log(err),
        complete: () => this.router.navigateByUrl('intranet'),
      });
  }

  httpGenerateTokens(): Observable<any> {
    const refreshToken = this.refreshToken;
    return this.http.post<any>(`${environment.baseUrl}/auth/refresh-tokens`, {
      refreshToken,
    });
  }

  logout(): void {
    this.profil.user = <Conseiller>{};
    this.accessToken = '';
    this.refreshToken = '';
    this.router.navigateByUrl('/');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
