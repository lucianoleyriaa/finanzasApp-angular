import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export class MovementApiService {
    baseURL: string = 'http://localhost:3000/finanzas/api/';

    constructor(private http: HttpClient) {}

    createNewMovement(movement: Movement, idCuenta: number) {
        return this.http.post<any>(
        `${this.baseURL}cuentas/${idCuenta}/movements/v2`,
        movement
        );
    }

    getMovementTypes() {
        return this.http.get<any>(this.baseURL + 'movementTypes');
    }

    updateMovement(movement, movement_id: number, account_id: number) {
        return this.http.patch<any>(`http://localhost:3000/finanzas/api/v2/accounts/${account_id}/movements/update/${movement_id}`, movement);
    }
}
