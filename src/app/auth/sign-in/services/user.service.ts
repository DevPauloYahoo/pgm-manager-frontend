import { Injectable } from '@angular/core';
import JWTDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

import { UserPayload } from '../models/payload.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$: BehaviorSubject<UserPayload | null> =
    new BehaviorSubject<UserPayload | null>(null);

  constructor(private readonly tokenService: TokenService) {
    tokenService.hasAccessToken() && this.decodeAndNotify();
  }

  setAccessToken(token: string | null) {
    this.tokenService.setAccessToken(token);
    this.decodeAndNotify();
  }

  setRefreshToken(token: string | null) {
    this.tokenService.setRefreshToken(token);
  }

  getUser() {
    return this.userSubject$.asObservable();
  }

  logout() {
    this.tokenService.removeAccessToken();
    this.userSubject$.next(null);
  }

  isLogged() {
    return this.tokenService.hasAccessToken();
  }

  private decodeAndNotify() {
    const access_token = this.tokenService.getAccessToken() as string;

    const { email, name, preferred_username, resource_access }: UserPayload =
      JWTDecode(access_token);

    const user: UserPayload = {
      email,
      name,
      preferred_username,
      resource_access,
    };

    this.userSubject$.next(user);
  }
}
