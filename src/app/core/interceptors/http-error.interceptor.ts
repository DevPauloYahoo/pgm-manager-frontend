import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { TokenService } from '../../auth/services/token.service';
import { UserService } from '../../auth/services/user.service';
import { ModalMessagesService } from '../services/modal-messages.service';
import { ToastMessageService } from '../services/toast-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly modalMessageService: ModalMessagesService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // validações usando o angular para se conectar ao keycloak
        if (err.error.error === 'invalid_grant') {
          this.toastMessageService.toastError('Usuário e/ou senha inválido');
        }

        if (err.error.error === 'unauthorized_client') {
          this.toastMessageService.toastError('Credenciais inválidas');
        }

        if (err.error.title === 'PrismaClientInitializationError') {
          this.toastMessageService.toastError(
            'Erro acesso database. Tente novamente'
          );
        }

        if (err.error.errorCode === 'P1001') {
          this.toastMessageService.toastError(
            'Erro acesso database. Tente novamente'
          );
        }

        if (err.status === 504) {
          this.toastMessageService.toastError(
            'Erro no servidor de autenticação. Tente novamente'
          );
        }

        // validações usando backend para se conectar ao keycloak
        if (err.error instanceof ErrorEvent) {
          console.log('ERROR EVENT', err);
        } else {
          if (err.status === 401 && err.error.message === 'invalid_grant') {
            this.toastMessageService.toastError('Usuário e/ou senha inválido');
          }

          if (
            err.status === 401 &&
            err.error.message === 'unauthorized_client'
          ) {
            this.toastMessageService.toastError('Credenciais inválidas');
          }

          if (err.status === 0) {
            this.toastMessageService.toastError(
              'Erro interno no servidor. Tente novamente'
            );

            this.userService.invalidAndExpiredAccessToken();
          }

          if (err.status === 403) {
            this.modalMessageService.modalTokenExpired(
              'Sua conexão expirou. Faça login'
            );
          }

          if (
            err.status === 500 &&
            err.error.title === 'KeycloakConnectionError'
          ) {
            this.toastMessageService.toastError(
              'Erro no servidor de autenticação. Tente novamente'
            );

            this.userService.invalidAndExpiredAccessToken();
          }
        }
        return throwError(() => Error(err.message));
      })
    );
  }
}
