import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { AuthApiService } from "src/app/services/api/AuthApiService";
import { AccountService } from "src/app/services/accountService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authApiService: AuthApiService, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      return new Promise((resolve, reject) => {
        return this.authApiService.getMe().subscribe((data) => {
          if (!data.result.user) {
            resolve(false)
          }

          this.accountService.setAccounts(data.result.user.userAccounts);
          resolve(true);
        });
      });
  }
}
