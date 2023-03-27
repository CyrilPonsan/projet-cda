import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { IntranetHomeComponent } from './pages/intranet-home/intranet-home.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: IntranetHomeComponent,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'profil', component: ProfilComponent },
      { path: 'add-user', component: AddUserComponent },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'materiel',
        loadChildren: () =>
          import('./materiel/materiel.module').then((m) => m.MaterielModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntranetRoutingModule {}
