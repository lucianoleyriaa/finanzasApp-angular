import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CuentasService } from 'src/app/services/cuentas.service';

import { Accounts } from '../cuenta.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
})
export class AccountComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private cuentasService: CuentasService, private router: Router) {}

  ngOnInit(): void {
  }
}
