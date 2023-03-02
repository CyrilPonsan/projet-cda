import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from '../utils/services/connexion.service';
import { ProfilService } from '../utils/services/profil.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /** Pointeur vers le profil pour pouvoir vérifier le statut de connexion de l'utilisateur */
  constructor(private profil: ProfilService, private conn: ConnexionService) {}
  /** Autoriser ou interdire l'accès à une guard */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.profil.user !== undefined) {
      if (
        this.profil.user.roles.includes('admin') ||
        this.profil.user.roles.includes('tech')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      const handshake = async () => {
        const result = await this.conn.httpHandshake();
      };
      handshake();
      return true;
    }
  }
}
