import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginService(email: string, password: string) {
    return this.http.post<{
      accessToken: string;
    }>(environment.apiUrl + '/Auth', { email, password });
  }

  get isLoggedIn() {
    if (localStorage.getItem('token')) return true;
    else return false;
  }
}
