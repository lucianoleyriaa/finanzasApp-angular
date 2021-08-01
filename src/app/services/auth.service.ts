import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface UserData {
  nombreUsuario: string;
  password: string;
}

interface newUserData {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  password: string;
}

interface User {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'http://localhost:3000/finanzas/api';
  loggedInUser!: {
    id: number;
    nombre: string;
    apellido: string;
    usuario: string;
    token: string;
  };

  constructor(private Http: HttpClient) {}

  login(userData: UserData): Observable<any> {
    return this.Http.post<any>(`${this.baseURL}/auth/login`, userData);
  }

  signup(userData: newUserData) {
    return this.Http.post<any>(`${this.baseURL}/auth/signup`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setUserInfo(user: User) {
    this.loggedInUser = user;
    localStorage.setItem('user', user.nombre);
  }
}
