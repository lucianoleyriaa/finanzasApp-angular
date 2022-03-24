import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovimientosService } from 'src/app/services/movimientos.service';
import { MovementService } from 'src/app/services/movementService';
import { CuentasService } from 'src/app/services/cuentas.service';
import { ModalService } from 'src/app/services/modal.service';

import { Movements } from './nuevo-movimiento/movimiento.model';

import { NewMovementModal } from '../../../../components/modals/new-movement/new-movement';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.html',
  styleUrls: ['./account-detail.css'],
})
export class AccountDetailComponent implements OnInit {
  accountId!: number;
  movimientos!: [Movements];
  saldoCuenta: number = 0;
  nombreCuenta!: string;

  constructor(
    private route: ActivatedRoute,
    private cuentaService: CuentasService,
    private movimientoService: MovimientosService,
    private modalService: ModalService,
    private movementService: MovementService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = params.id;
      this.cuentaService.getAccountDetail(params.id).subscribe((data) => {
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

    this.movementService.movementAdded.subscribe((movement: Movements) => {
      this.movimientos.unshift(movement);
    })
  }

  addMovement(type: {}) {
    this.modalService.show(NewMovementModal, {initialState: {movementType: type}});
  }

  private formatearFecha(movimientos: [Movements]) {
    movimientos.forEach((el) => {
      const fecha = new Date(el.fecha);
      el.fecha = fecha.toLocaleDateString('es');
    });
  }
}
