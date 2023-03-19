import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { TokenService } from '../../auth/services/token.service';
import { UserService } from '../../auth/services/user.service';
import { ToastMessageService } from '../services/toast-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          console.log('ERROR EVENT', err);
        } else {
          console.log('ACONTECEU UM ERROR', err.status);
          if (err.status === 400) {
            this.toastMessageService.showError({
              message: 'Usuário e/ou senha inválido',
              title: 'Falha no login',
              position: 'toast-top-right',
              time: 3000,
            });
          }

          if (err.status === 0) {
            this.toastMessageService.showError({
              message: 'Erro interno no servidor. Tente novamente',
              title: 'Erro',
              position: 'toast-top-right',
              time: 5000,
            });
          }

          if (err.status === 403) {
            this.toastMessageService.showInfo({
              message: 'Sua conexão expirou. Faça login',
              title: 'Conexão',
              position: 'toast-top-right',
              time: 5000,
            });

            this.userService.invalidAndExpiredAccessToken();
          }
        }
        return throwError(() => Error(err.message));
      })
    );
  }
}
