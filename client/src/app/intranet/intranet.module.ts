import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetHomeComponent } from './pages/intranet-home/intranet-home.component';
import { ProfilComponent } from './pages/profil/profil.component';

@NgModule({
  declarations: [IntranetHomeComponent, ProfilComponent],
  imports: [CommonModule, IntranetRoutingModule],
})
export class IntranetModule {}
