import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.scss'],
})
export class TicketHomeComponent implements OnInit {
  constructor(public tck: TicketsService) {}

  ngOnInit(): void {
    if (!this.tck.statuts) {
      this.tck.httpGetStatuts();
    }
    this.tck.httpGetTickets();
  }
}
