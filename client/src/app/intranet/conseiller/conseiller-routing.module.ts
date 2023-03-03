import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConseillerHomeComponent } from './pages/conseiller-home/conseiller-home.component';
const routes: Routes = [
  {path: '', component: ConseillerHomeComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseillerRoutingModule {}
