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
    this.accessToken = sessionStorage.getItem('accessToken')!;
    let authReq = this.addTokenToHeaders(req, this.accessToken);
    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleRefreshToken(req, next);
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          this.conn.logout();
        }
        return throwError(() => error);
      })
    );
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.conn.httpGenerateTokens().pipe(
      switchMap((data: any) => {
        this.conn.saveTokens(data.accessToken, data.refreshToken);
        return next.handle(this.addTokenToHeaders(request, data.accessToken));
      })
    );
  }

  private addTokenToHeaders(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `bearer ${accessToken}`),
    });
  }
}
