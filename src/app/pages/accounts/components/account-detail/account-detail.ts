import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';
import { MovementService } from 'src/app/services/api-services/movementService';
import { MovementApiService } from 'src/app/services/movementApiService';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modalService';

import { Movements } from '../../../../../models/movimiento.model';

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
    private accountApiService: AccountApiService,
    private accountService: AccountService,
    private movementApiService: MovementApiService,
    private modalService: ModalService,
    private movementService: MovementService,
  ) {
    // @ts-ignore
    window.AccountDetailComponent = this;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accountId = params.id;
      this.accountApiService.getAccountDetail(params.id).subscribe((data) => {
        this.accountService.setActiveAccount(this.accountId);
        this.formatearFecha(data.movCuenta[0].movimientos);
        this.movimientos = data.movCuenta[0].movimientos;
        this.saldoCuenta = data.movCuenta[0].saldo;
        this.nombreCuenta = data.movCuenta[0].nombre;
      });
    });

    this.movementApiService.nuevoMovimiento$.subscribe(
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
