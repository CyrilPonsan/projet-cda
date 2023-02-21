import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsService } from './utils/services/clients.service';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientRechercheComponent } from './components/client-recherche/client-recherche.component';
import { NewClientComponent } from './pages/new-client/new-client.component';

@NgModule({
  declarations: [ClientHomeComponent, ClientDetailComponent, ClientRechercheComponent, NewClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
  providers: [ClientsService],
})
export class ClientsModule {}
