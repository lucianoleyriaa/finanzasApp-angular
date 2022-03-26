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

  setActiveAccount(id) {
    this.activeAccount = this.accounts.find(acc => acc.id === +id);
    this.activeAccountChanged.next(this.activeAccount);
  }

  addAccount(account) {
    this.accounts.push(account);
    this.userAccountsChanged.next(this.accounts);
  }

}
