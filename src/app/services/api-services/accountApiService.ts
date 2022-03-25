import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Accounts } from '../../../models/cuenta.model';

interface Acccount {
  nombre: string;
  saldo_inicial: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  baseURL: string = 'http://localhost:3000/finanzas/api/';
  newAccounts: Subject<Accounts> = new Subject();

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}cuentas`);
  }

  createAccount(accountData: Acccount): Observable<any> {
    return this.http.post<any>(`${this.baseURL}cuentas`, accountData);
  }

  getAccountDetail(id: number) {
    return this.http.get<any>(`${this.baseURL}cuentas/${id}/movimientos`);
  }
}
