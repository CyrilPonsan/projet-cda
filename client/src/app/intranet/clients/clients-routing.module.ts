import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientRechercheComponent } from './components/client-recherche/client-recherche.component';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';

const routes: Routes = [
  { path: '', component: ClientHomeComponent },
  { path: 'detail/:contrat', component: ClientDetailComponent },
  { path: 'recherche', component: ClientRechercheComponent },
  { path: 'ajouter', component: NewClientComponent },
  { path: 'editer', component: EditClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
