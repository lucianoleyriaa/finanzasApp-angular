import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CuentasService } from 'src/app/services/cuentas.service';

import { Accounts } from '../cuentas/cuenta.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private cuentaService: CuentasService) {}

  ngOnInit(): void {
    this.cuentaService.getAccounts().subscribe(
      (data) => {
        this.accounts = data.cuentas;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
