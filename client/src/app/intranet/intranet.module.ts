import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetHomeComponent } from './pages/intranet-home/intranet-home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    IntranetHomeComponent,
    ProfilComponent,
    AdminDashboardComponent,
  ],
  imports: [CommonModule, IntranetRoutingModule, SharedModule],
})
export class IntranetModule {}
