import { Component } from '@angular/core';
import { slide } from 'src/app/intranet/shared/animations/animations';
import { TicketsService } from 'src/app/intranet/tickets/utils/services/tickets.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [slide],
})
export class SidebarComponent {
  constructor(public tck: TicketsService) {}

  closeHandler(): void {
    this.tck.isSidebarOpen = false;
  }
}
