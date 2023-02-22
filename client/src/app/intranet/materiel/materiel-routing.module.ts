import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';

const routes: Routes = [{ path: '', component: MaterielHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}
