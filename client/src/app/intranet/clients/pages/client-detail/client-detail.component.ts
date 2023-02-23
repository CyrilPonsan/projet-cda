import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client, Ticket } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  client!: Client;
  clientTicket!: Array<Ticket>;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.clientsService.client === undefined ||
      this.clientsService.client.length === 0
    ) {
      this.router.navigateByUrl('/intranet/clients');
    } else {
      this.client = this.clientsService.client[0];
      this.clientsService.httpGetClientTickets(this.client.id).subscribe({
        next: (response) => {
          this.clientTicket = response;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.table(this.clientTicket);
        },
      });
    }
  }

  editClientHandler(): void {
    this.router.navigateByUrl('/intranet/clients/editer');
  }
}
