import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';

@Injectable()
export class MaterielService {
  constructor(private http: HttpClient, private pag: PaginationService) {}

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseUrl}/materiel/type-materiel`
    );
  }

  getMarques(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/materiel/marque`);
  }

  getModeles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/materiel/modele`);
  }

  getClientMateriels(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/materiel/client?page=${this.pag.page}&limite=${this.pag.max}&id=${id}`
    );
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
