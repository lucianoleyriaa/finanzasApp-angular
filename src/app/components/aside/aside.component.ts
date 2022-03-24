import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modalService';

import { Accounts } from '../../pages/accounts/components/cuenta.model';

import { NewAccountModal } from '../modals/new-account/new-account';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  accounts!: [Accounts];

  constructor(
    private accountApiService: AccountApiService,
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
