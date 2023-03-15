import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  BASE_URL = 'http://localhost:3000/api/users/sign-in';

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  signIn(username: string, password: string) {
    return this.http
      .post(this.BASE_URL, { username, password }, { observe: 'response' })
      .pipe(
        tap(res => {
          const accessToken = res.headers.get('x-access-token');
          const refreshToken = res.headers.get('x-refresh-token');
          this.tokenService.setAccessToken(accessToken);
          this.tokenService.setRefreshToken(refreshToken);
        })
      );
  }
}
