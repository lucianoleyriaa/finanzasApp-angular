import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-nueva-cuenta',
  templateUrl: './nueva-cuenta.component.html',
  styleUrls: ['./nueva-cuenta.component.css'],
})
export class NuevaCuentaComponent implements OnInit {
  constructor(private cuentaService: CuentasService, private router: Router) {}

  ngOnInit(): void {}

  onAddAccount(form: NgForm) {
    const nombre = form.value.nombre;
    const saldo_inicial = +form.value.saldo_inicial;

    this.cuentaService.createAccount({ nombre, saldo_inicial }).subscribe(
      (data) => {
        this.cuentaService.newAccounts.next(data.nuevaCuenta);
        this.router.navigateByUrl('/cuentas');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}