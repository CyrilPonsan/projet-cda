import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';
import { MaterielRoutingModule } from './materiel-routing.module';

@NgModule({
  declarations: [MaterielHomeComponent],
  imports: [CommonModule, MaterielRoutingModule],
})
export class MaterielModule {}
