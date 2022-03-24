import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AccountDetailComponent } from "./components/account-detail/account-detail";
import { NewAccountComponent } from "./components/new-account/new-account";
import { AccountComponent } from "./components/account/account";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: ':id/account-detail',
    component: AccountDetailComponent
  }
]

@NgModule({
  declarations: [AccountComponent, AccountDetailComponent, NewAccountComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  exports: [RouterModule],
})
export class AccountsModule {}
