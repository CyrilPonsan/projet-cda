import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TicketHomeComponent } from './pages/ticket-home/ticket-home.component';
import { TicketsService } from './utils/services/tickets.service';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { InterventionComponent } from './components/intervention/intervention.component';
import { TicketSummaryComponent } from './components/ticket-summary/ticket-summary.component';
import { InterventionsListComponent } from './components/interventions-list/interventions-list.component';

@NgModule({
  declarations: [TicketHomeComponent, TicketDetailsComponent, InterventionComponent, TicketSummaryComponent, InterventionsListComponent],
  imports: [CommonModule, TicketsRoutingModule, SharedModule],
  providers: [TicketsService],
})
export class TicketsModule {}
