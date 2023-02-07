import { Injectable } from '@angular/core';
import Conseiller from '../models/conseiller.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  user!: Conseiller;

  constructor() {}
}
