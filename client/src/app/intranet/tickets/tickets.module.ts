import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TicketHomeComponent } from './pages/ticket-home/ticket-home.component';

@NgModule({
  declarations: [TicketHomeComponent],
  imports: [CommonModule, TicketsRoutingModule, SharedModule],
})
export class TicketsModule {}
