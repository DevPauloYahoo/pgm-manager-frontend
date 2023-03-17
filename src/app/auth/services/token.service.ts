import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  KEY_ACCESS_TOKEN = 'accessToken';
  KEY_REFRESH_TOKEN = 'refreshToken';

  // access token
  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  setAccessToken(token: string | null): void {
    localStorage.setItem(this.KEY_ACCESS_TOKEN, token as string);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.KEY_ACCESS_TOKEN);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.KEY_ACCESS_TOKEN);
  }

  // refresh token
  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  }

  setRefreshToken(token: string | null): void {
    localStorage.setItem(this.KEY_REFRESH_TOKEN, token as string);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.KEY_REFRESH_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.KEY_REFRESH_TOKEN);
  }
}
