import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DetalleCuentaComponent } from './components/cuentas/detalle-cuenta/detalle-cuenta.component';
import { NuevaCuentaComponent } from './components/cuentas/nueva-cuenta/nueva-cuenta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Rutas
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'cuentas/:id/movimientos',
        component: DetalleCuentaComponent,
        children: [
          // { path: ':id/nuevo-movimiento', component:  },
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
