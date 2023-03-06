import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ConnexionService } from '../../utils/services/connexion.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken!: string;

  constructor(private conn: ConnexionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });
    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.conn.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
