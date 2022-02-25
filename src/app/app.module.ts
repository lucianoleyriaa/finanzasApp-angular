import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthService } from './services/auth.service';
import { AppRouting } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CuentaComponent } from './components/cuentas/cuenta/cuenta.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { NuevaCuentaComponent } from './components/cuentas/nueva-cuenta/nueva-cuenta.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetalleCuentaComponent } from './components/cuentas/detalle-cuenta/detalle-cuenta.component';
import { NewMovementModal } from './components/modals/new-movement';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CuentaComponent,
    SignupComponent,
    NuevaCuentaComponent,
    AsideComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    DetalleCuentaComponent,
    NewMovementModal,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
