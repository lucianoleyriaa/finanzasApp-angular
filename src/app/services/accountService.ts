import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts = [];

  constructor() {}

  setAccounts(accounts) {
    this.accounts = accounts;
  }

  addAccount(account) {
    this.accounts.push(account);
  }

}
