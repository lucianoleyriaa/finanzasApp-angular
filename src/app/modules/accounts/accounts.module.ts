import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AccountDetailComponent } from "./components/account-detail/account-detail";
import { NewMovementModal } from "./components/modals/new-movement/new-movement";
import { NewAccountModal } from "./components/modals/new-account/new-account";
import { NewAccountComponent } from "./components/new-account/new-account";
import { AccountComponent } from "./components/account/account";
import { SharedModule } from "src/app/shared/shared.module";

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
  declarations: [
    AccountComponent,
    AccountDetailComponent,
    NewAccountComponent,
    NewAccountModal,
    NewMovementModal
  ],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  exports: [RouterModule],
})
export class AccountsModule {}
