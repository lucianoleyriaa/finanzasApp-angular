import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CuentasService } from 'src/app/services/cuentas.service';

import { Accounts } from '../cuenta.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
})
export class CuentaComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private cuentasService: CuentasService, private router: Router) {}

  ngOnInit(): void {
    // this.cuentasService.getAccounts().subscribe(
    //   (accounts) => {
    //     this.accounts = accounts.cuentas;
    //   },
    //   (error) => {
    //     console.log(error.error.message);
    //     this.router.navigateByUrl('/login');
    //   }
    // );
    // this.cuentasService.newAccounts.subscribe((account) =>
    //   this.accounts.push(account)
    // );
  }
}
