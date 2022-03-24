import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthModule } from './pages/auth/auth.module';
import { AppRouting } from './app-routing.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { AuthApiService } from './services/api-services/AuthApiService';

import { NewMovementModal } from './components/modals/new-movement/new-movement';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewAccountModal } from './components/modals/new-account/new-account';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
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
    AuthApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
