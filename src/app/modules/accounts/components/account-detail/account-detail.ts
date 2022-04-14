import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountApiService } from 'src/app/services/api/accountApiService';
import { MovementService } from 'src/app/services/api/movementService';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modalService';

import { Movement, Movements } from 'src/app/models/movement.model';

import { NewMovementModal } from '../modals/new-movement/new-movement';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.html',
  styleUrls: ['./account-detail.css'],
})
export class AccountDetailComponent implements OnInit {
  accountId!: number;
  movements: Movement[];
  saldoCuenta: number = 0;
  accountName: string;

  constructor(
    private route: ActivatedRoute,
    private accountApiService: AccountApiService,
    private accountService: AccountService,
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
          this.formatearFecha(data.movements)
          this.movements = data.movements,
          this.saldoCuenta = data.account_saldo;
          this.accountName = this.accountService.getActiveAccount().nombre;
      });
    });

    this.movementService.movementAdded.subscribe((movement: Movement) => {
      this.movements.unshift(movement);
    })
  }

  addMovement(type: {}) {
    this.modalService.show(NewMovementModal, {initialState: {movementType: type}});
  }

  private formatearFecha(movimientos: Movement[]) {
    movimientos.forEach((el) => {
      const fecha = new Date(el.date);
      el.date = fecha.toLocaleDateString('es');
    });
  }

  onEditMovement(id: number, movType: any): void {
    const mov = this.movements.find(m => m.id === id);
    this.modalService.show(NewMovementModal, {initialState: {movementType: movType, mode: 'edit', movement: {...mov}}});
  }
}
