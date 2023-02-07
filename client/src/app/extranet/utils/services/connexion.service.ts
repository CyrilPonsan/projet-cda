import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient, private router: Router) {}

  httpConnexion(username: string, password: string): void {
    this.http
      .post<any>(`${environment.baseUrl}/auth/`, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (user) => {
          console.log(user);
        },
        error: (err) => console.log(err),
        complete: () => this.router.navigateByUrl('intranet'),
      });
  }
}
