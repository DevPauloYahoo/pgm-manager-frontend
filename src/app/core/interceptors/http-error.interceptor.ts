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
        // validações usando o angular para se conectar ao keycloak
        if (err.error.error === 'invalid_grant') {
          this.toastMessageService.showError({
            title: 'Erro autenticação',
            message: 'Usuário e/ou senha inválido',
            time: 3000,
          });
        }

        if (err.error.error === 'unauthorized_client') {
          this.toastMessageService.showError({
            title: 'Erro interno',
            message: 'Credenciais inválidas',
            time: 3000,
          });
        }

        if (err.error.title === 'PrismaClientInitializationError') {
          this.toastMessageService.showError({
            title: 'Erro interno',
            message: 'Erro acesso database. Tente novamente',
            time: 5000,
          });
        }

        if (err.error.errorCode === 'P1001') {
          this.toastMessageService.showError({
            title: 'Erro interno',
            message: 'Erro acesso database. Tente novamente',
            time: 5000,
          });
        }

        if (err.status === 504) {
          this.toastMessageService.showError({
            title: 'Erro interno',
            message: 'Erro no servidor de autenticação. Tente novamente',
            time: 5000,
          });
        }

        // validações usando backend para se conectar ao keycloak
        if (err.error instanceof ErrorEvent) {
          console.log('ERROR EVENT', err);
        } else {
          if (err.status === 401 && err.error.message === 'invalid_grant') {
            this.toastMessageService.showError({
              title: 'Erro autenticação',
              message: 'Usuário e/ou senha inválido',
              time: 3000,
            });
          }

          if (
            err.status === 401 &&
            err.error.message === 'unauthorized_client'
          ) {
            this.toastMessageService.showError({
              title: 'Erro interno',
              message: 'Credenciais inválidas',
              time: 3000,
            });
          }

          if (err.status === 0) {
            this.toastMessageService.showError({
              title: 'Erro time out',
              message: 'Erro interno no servidor. Tente novamente',
              time: 5000,
            });

            this.userService.invalidAndExpiredAccessToken();
          }

          if (err.status === 403) {
            this.toastMessageService.showInfo({
              title: 'Sessão expirou',
              message: 'Sua conexão expirou. Faça login',
              time: 5000,
            });

            this.userService.invalidAndExpiredAccessToken();
          }

          if (
            err.status === 500 &&
            err.error.title === 'KeycloakConnectionError'
          ) {
            this.toastMessageService.showError({
              title: 'Erro interno',
              message: 'Erro no servidor de autenticação. Tente novamente',
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
