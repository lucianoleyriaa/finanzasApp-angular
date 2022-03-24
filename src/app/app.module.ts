import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthModule } from './pages/auth/auth.module';
import { AppRouting } from './app-routing.module';

import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { AuthService } from './services/auth.service';

import { DetalleCuentaComponent } from './components/cuentas/detalle-cuenta/detalle-cuenta.component';
import { NuevaCuentaComponent } from './components/cuentas/nueva-cuenta/nueva-cuenta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuentaComponent } from './components/cuentas/cuenta/cuenta.component';
import { NewMovementModal } from './components/modals/new-movement/new-movement';
import { NewAccountModal } from './components/modals/new-account/new-account';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentaComponent,
    NuevaCuentaComponent,
    AsideComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    DetalleCuentaComponent,
    NewMovementModal,
    NewAccountModal,
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
    AuthModule,

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
