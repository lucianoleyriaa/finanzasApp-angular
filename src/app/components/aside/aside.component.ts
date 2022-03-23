import { Component, OnInit } from '@angular/core';

import { CuentasService } from 'src/app/services/cuentas.service';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modal.service';

import { Accounts } from '../cuentas/cuenta.model';

import { NewAccountModal } from '../modals/new-account/new-account';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  accounts!: [Accounts];

  constructor(
    private accountApiService: CuentasService,
    private modalService: ModalService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountApiService.getAccounts().subscribe(
      (data) => {
        this.accounts = data.cuentas;
        this.accountService.setAccounts(this.accounts)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAddAccount() {
    this.modalService.show(NewAccountModal, {});
  }

  onShowAccountResume(id) {
    this.router.navigate(['cuentas', id, 'movimientos'], { relativeTo: this.route });
  }
}
