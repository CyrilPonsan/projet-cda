import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';
import { NewMaterielComponent } from './pages/new-materiel/new-materiel.component';

const routes: Routes = [
  { path: '', component: MaterielHomeComponent },
  { path: 'new-materiel', component: NewMaterielComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}
