import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConseillerDetailsComponent } from './pages/conseiller-details/conseiller-details.component';
import { ConseillerHomeComponent } from './pages/conseiller-home/conseiller-home.component';
import { ConseillerRoutingModule } from './conseiller-routing.module';
import { NewConseillerComponent } from './pages/new-conseiller/new-conseiller.component';
import { EditConseillerComponent } from './pages/edit-conseiller/edit-conseiller.component';
import { ConseillersComponent } from './services/conseillers/conseillers.component';
import { ConseillerFormComponent } from './components/conseiller-form/conseiller-form/conseiller-form.component';
import { ConseillerRechercheComponent } from './components/conseiller-recherche/conseiller-recherche/conseiller-recherche.component';



@NgModule({
  declarations: [
    ConseillerDetailsComponent,
    ConseillerHomeComponent,
    NewConseillerComponent,
    EditConseillerComponent,
    ConseillersComponent,
    ConseillerFormComponent,
    ConseillerRechercheComponent
  ],
  imports: [
    CommonModule, ConseillerRoutingModule
  ]
})
export class ConseillerModule { }
