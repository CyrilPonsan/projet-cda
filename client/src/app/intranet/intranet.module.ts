import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetHomeComponent } from './pages/intranet-home/intranet-home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from './shared/shared.module';
import { ConseillerFormComponent } from './components/conseiller-form/conseiller-form.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

@NgModule({
  declarations: [
    IntranetHomeComponent,
    ProfilComponent,
    AdminDashboardComponent,
    ConseillerFormComponent,
    AddUserComponent,
  ],
  imports: [CommonModule, IntranetRoutingModule, SharedModule],
})
export class IntranetModule {}
