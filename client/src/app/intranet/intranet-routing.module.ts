import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetHomeComponent } from './pages/intranet-home/intranet-home.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: IntranetHomeComponent,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'profil', component: ProfilComponent },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets-routing.module').then(
            (m) => m.TicketsRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntranetRoutingModule {}
