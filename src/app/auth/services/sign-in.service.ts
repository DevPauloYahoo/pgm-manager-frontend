import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  BASE_URL = 'http://localhost:3000/api/users/sign-in';

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  signIn(username: string, password: string) {
    return this.http
      .post(this.BASE_URL, { username, password }, { observe: 'response' })
      .pipe(
        tap(res => {
          const accessToken = res.headers.get('x-access-token');
          const refreshToken = res.headers.get('x-refresh-token');

          this.userService.setAccessToken(accessToken);
          this.userService.setRefreshToken(refreshToken);
        })
      );
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http
      .post<{ access_token: string; refresh_token: string }>(
        'realms/pgm/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'pgm_manager',
          client_secret: 'keShwJQAbwxNd9Z3r2lrw0PPZQahUFOa',
          grant_type: 'password',
          username,
          password,
        }),
        { headers }
      )
      .pipe(
        tap(res => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;

          this.userService.setAccessToken(accessToken);
          this.userService.setRefreshToken(refreshToken);
        })
      );
  }

  // logout() {
  //   return this.http
  //     .get('realms/pgm/protocol/openid-connect/logout')
  //     .subscribe({
  //       next: () => this.router.navigate(['']),
  //     });
  // }
}
