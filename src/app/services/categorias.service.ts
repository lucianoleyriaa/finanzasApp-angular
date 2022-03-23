import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  baseURL: string = 'http://localhost:3000/finanzas/api/';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.baseURL + 'categorias');
  }

  getCategorias(id: number) {
    return this.http.get<any>(`${this.baseURL}categorias/${id}`);
  }
}
