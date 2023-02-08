import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './extranet/pages/connexion/connexion.component';
import { AuthGuard } from './extranet/security/auth.guard';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  {
    path: 'intranet',
    loadChildren: () =>
      import('./intranet/intranet.module').then((m) => m.IntranetModule),
    /* canActivate: [AuthGuard],
    canLoad: [AuthGuard], */
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
