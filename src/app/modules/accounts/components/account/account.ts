import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AccountApiService } from 'src/app/services/api/accountApiService';
import { AccountService } from 'src/app/services/accountService';
import { ModalService } from 'src/app/services/modalService';

import { Accounts } from 'src/app/models/account.model';

import { NewAccountModal } from '../modals/new-account/new-account';

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
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    // @ts-ignore
    window.AccountComponent = this;
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();

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

  onShowAccountDetail(id) {
    this.router.navigate([id, "account-detail"], { relativeTo: this.route })
  }
}
