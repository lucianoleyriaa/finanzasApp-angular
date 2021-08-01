import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';

import { Accounts } from '../cuentas/cuenta.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private cuentasService: CuentasService, private router: Router) {}

  ngOnInit(): void {
    this.cuentasService.getAccounts().subscribe(
      (accounts) => {
        this.accounts = accounts.cuentas;
      },
      (error) => {
        console.log(error.error.message);
        this.router.navigateByUrl('/login');
      }
    );
  }
}
