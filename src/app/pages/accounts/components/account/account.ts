import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modalService';

import { Accounts } from '../../../../../models/cuenta.model';

import { NewAccountModal } from 'src/app/components/modals/new-account/new-account';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  accounts!: Accounts[];

  constructor(
    private accountApiService: AccountApiService,
    private accountService: AccountService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.accountApiService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.cuentas;
    }));

    this.subscriptions.add(this.accountService.userAccountsChanged.subscribe((accounts: Accounts[]) => {
      this.accounts = accounts;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onAddAccount() {
    this.modalService.show(NewAccountModal);
  }
}
