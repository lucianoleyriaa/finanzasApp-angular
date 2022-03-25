import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import { Accounts } from "../../models/cuenta.model";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  activeAccountChanged: Subject<Accounts> = new Subject();
  userAccountsChanged: Subject<Accounts[]> = new Subject();
  accounts: [Accounts];
  activeAccount: Accounts;

  constructor() {}

  getAccounts() {
    return this.accounts;
  }

  setAccounts(accounts) {
    this.accounts = accounts;
  }

  getActiveAccount() {
    return this.activeAccount;
  }

  addAccount(account) {
    this.accounts.push(account);
    this.userAccountsChanged.next(this.accounts);
  }

}
