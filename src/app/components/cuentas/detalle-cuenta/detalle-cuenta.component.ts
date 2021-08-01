import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

import { Movements } from './nuevo-movimiento/movimiento.model';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css'],
})
export class DetalleCuentaComponent implements OnInit {
  accountId!: number;
  movimientos!: [Movements];
  saldoCuenta: number = 0;
  nombreCuenta!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cuentaService: CuentasService,
    private movimientoService: MovimientosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      this.accountId = id.id;
      this.cuentaService.getAccountDetail(id.id).subscribe((data) => {
        this.formatearFecha(data.movCuenta[0].movimientos);
        this.movimientos = data.movCuenta[0].movimientos;
        this.saldoCuenta = data.movCuenta[0].saldo;
        this.nombreCuenta = data.movCuenta[0].nombre;
      });
    });

    this.movimientoService.nuevoMovimiento$.subscribe(
      (movimiento: Movements) => {
        if (movimiento.id_tipo_mov === 1) {
          this.saldoCuenta = this.saldoCuenta + Number(movimiento.monto);
        } else {
          this.saldoCuenta = this.saldoCuenta - Number(movimiento.monto);
        }
        console.log(movimiento);
        this.movimientos.unshift(movimiento);
      }
    );
  }

  addMovement() {
    this.router.navigate([`${this.accountId}`, 'nuevo-movimiento'], {
      relativeTo: this.route,
    });
  }

  private formatearFecha(movimientos: [Movements]) {
    movimientos.forEach((el) => {
      const fecha = new Date(el.fecha);
      el.fecha = fecha.toLocaleDateString('es');
    });
  }
}
