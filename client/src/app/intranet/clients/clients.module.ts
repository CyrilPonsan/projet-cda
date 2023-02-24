import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsService } from './utils/services/clients.service';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientRechercheComponent } from './components/client-recherche/client-recherche.component';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTicketComponent } from './components/client-ticket/client-ticket.component';
import { ListeTicketsComponent } from './components/liste-tickets/liste-tickets.component';

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientDetailComponent,
    ClientRechercheComponent,
    NewClientComponent,
    EditClientComponent,
    ClientFormComponent,
    ClientTicketComponent,
    ListeTicketsComponent,
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
  providers: [ClientsService],
})
export class ClientsModule {}
