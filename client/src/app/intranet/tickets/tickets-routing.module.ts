import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { TicketHomeComponent } from './pages/ticket-home/ticket-home.component';

const routes: Routes = [
  { path: '', component: TicketHomeComponent },
  { path: ':ref', component: TicketDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
