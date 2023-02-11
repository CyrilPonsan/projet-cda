import { Component } from '@angular/core';
import { TicketsService } from 'src/app/intranet/tickets/utils/services/tickets.service';
import { slide } from '../../animations/animations';

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
