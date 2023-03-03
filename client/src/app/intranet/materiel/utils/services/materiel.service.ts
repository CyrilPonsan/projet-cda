import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Materiel } from 'src/app/intranet/shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class MaterielService {
  constructor(
    private http: HttpClient,
    ) {}

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/materiel/types`);
  }

  getMarques(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/materiel/marques`);
  }

  getModeles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/materiel/modeles`);
  }

  getClientMateriels(id :number): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${environment.baseUrl}/materiel/client?page=1&limite=5&id=${id}`);
  }

  getMateriel(ref: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/materiel/${ref}`);
  }

  addMateriel(materiel: string): Observable<string> {
    return this.http.post<string>(` ${environment.baseUrl}/materiel`, materiel);
  }

  updateMateriel(materiel: string): Observable<string> {
    return this.http.put<string>(` ${environment.baseUrl}/materiel`, materiel);
  }

  deleteMateriel(id: string): Observable<string> {
    return this.http.delete<string>(` ${environment.baseUrl}/materiel/${id}`);
  }

  searchMateriel(term: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.baseUrl}/materiel/search/${term}`
    );
  }
}
