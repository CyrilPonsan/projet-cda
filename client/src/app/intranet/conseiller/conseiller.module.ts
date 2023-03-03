import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConseillerDetailsComponent } from './pages/conseiller-details/conseiller-details.component';
import { ConseillerHomeComponent } from './pages/conseiller-home/conseiller-home.component';
import { ConseillerRoutingModule } from './conseiller-routing.module';



@NgModule({
  declarations: [
    ConseillerDetailsComponent,
    ConseillerHomeComponent
  ],
  imports: [
    CommonModule, ConseillerRoutingModule
  ]
})
export class ConseillerModule { }
