import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConseillerDetailsComponent } from './pages/conseiller-details/conseiller-details.component';
import { ConseillerHomeComponent } from './pages/conseiller-home/conseiller-home.component';
import { EditConseillerComponent } from './pages/edit-conseiller/edit-conseiller.component';
import { NewConseillerComponent } from './pages/new-conseiller/new-conseiller.component';

const routes: Routes = [
  { path: 'detail/:contrat', component: ConseillerDetailsComponent },
  { path: '', component: ConseillerHomeComponent },
  // { path: 'recherche', component: ConseillerRechercheComponent },
  { path: 'ajouter', component: NewConseillerComponent },
  { path: 'editer', component: EditConseillerComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseillerRoutingModule {}
