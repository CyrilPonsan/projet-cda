import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientRechercheComponent } from './components/client-recherche/client-recherche.component';
import { ClientHomeComponent } from './pages/client-home/client-home.component';

const routes: Routes = [
  { path: '', component: ClientHomeComponent },
  { path: 'detail/:contrat', component: ClientDetailComponent },
  { path: 'recherche', component: ClientRechercheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
