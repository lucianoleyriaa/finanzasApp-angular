import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Movements } from '../components/cuentas/detalle-cuenta/nuevo-movimiento/movimiento.model';

interface Movement {
  nombre: string;
  id_tipo_mov: string;
  id_cuenta_destino?: string;
  id_categoria: string;
  monto: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  baseURL: string = 'http://localhost:3000/finanzas/api/';
  nuevoMovimiento$: Subject<Movements> = new Subject();

  constructor(private http: HttpClient) {}

  createNewMovement(movement: Movement, idCuenta: number) {
    return this.http.post<any>(
      `${this.baseURL}cuentas/${idCuenta}/movimientos`,
      movement
    );
  }

  getMovementTypes() {
    return this.http.get<any>(this.baseURL + 'movementTypes');
  }
}
