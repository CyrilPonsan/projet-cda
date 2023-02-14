import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsService } from './utils/services/clients.service';

@NgModule({
  declarations: [ClientHomeComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
  providers: [ClientsService],
})
export class ClientsModule {}
