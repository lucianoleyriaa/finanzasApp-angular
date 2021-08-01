import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CuentaComponent } from './components/cuentas/cuenta/cuenta.component';
import { NuevaCuentaComponent } from './components/cuentas/nueva-cuenta/nueva-cuenta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetalleCuentaComponent } from './components/cuentas/detalle-cuenta/detalle-cuenta.component';
import { NuevoMovimientoComponent } from './components/cuentas/detalle-cuenta/nuevo-movimiento/nuevo-movimiento.component';

// Rutas
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'cuentas/:id/movimientos',
        component: DetalleCuentaComponent,
        children: [
          { path: ':id/nuevo-movimiento', component: NuevoMovimientoComponent },
        ],
      },
      { path: 'nuevo', component: NuevaCuentaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
