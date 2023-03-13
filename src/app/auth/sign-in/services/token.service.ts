import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  KEY = 'authToken';

  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(token: string | null): void {
    localStorage.setItem(this.KEY, token as string);
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.KEY);
  }
}
