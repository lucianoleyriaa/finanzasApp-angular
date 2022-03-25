import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.html',
  styleUrls: ['./new-account.css'],
})
export class NewAccountComponent implements OnInit {
  constructor(private accountApiService: AccountApiService, private router: Router) {}

  ngOnInit(): void {}

  onAddAccount(form: NgForm) {
    const nombre = form.value.nombre;
    const saldo_inicial = +form.value.saldo_inicial;

    this.accountApiService.createAccount({ nombre, saldo_inicial }).subscribe(
      (data) => {
        this.accountApiService.newAccounts.next(data.nuevaCuenta);
        this.router.navigateByUrl('/cuentas');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
