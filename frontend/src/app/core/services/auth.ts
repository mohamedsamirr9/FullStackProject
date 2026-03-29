import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS, API_URLS2 } from '../constants/api_urls';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private httpclient: HttpClient) {}
  login(email: string, password: string) {
    console.log(email, password);
    return this.httpclient.post(API_URLS2.login, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.token);
      }),
    );
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    return this.httpclient.post(API_URLS2.register, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  }
  logout() {
    localStorage.removeItem('accessToken');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        payload['role'] ||
        null
      );
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
}
