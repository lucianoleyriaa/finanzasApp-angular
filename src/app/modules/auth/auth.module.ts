import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
]

@NgModule({
  declarations: [
    LoginComponent, SignupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    CommonModule
  ],
  exports: [RouterModule]
})

export class AuthModule {}
