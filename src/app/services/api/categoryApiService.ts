import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  baseURL: string = 'http://localhost:3000/finanzas/api/';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.baseURL + 'categorias');
  }

  getCategorias(id: number) {
    return this.http.get<any>(`${this.baseURL}categorias/${id}`);
  }
}
