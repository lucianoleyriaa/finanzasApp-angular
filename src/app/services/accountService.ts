import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import { Accounts } from "../pages/accounts/components/cuenta.model";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  activeAccountChanged: Subject<Accounts> = new Subject();
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
  }

}
