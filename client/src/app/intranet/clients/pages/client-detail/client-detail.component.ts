import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Ticket } from 'src/app/intranet/shared/models/models';
import { ClientTicket } from '../../utils/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  client!: Client;
  clientTicket!: Array<ClientTicket>;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const contrat = this.route.snapshot.paramMap.get('contrat');
    if (contrat !== null) {
      this.clientsService.httpSearchClients('contrat', contrat).subscribe({
        next: (response) => {
          console.log(response);
          this.client = response[0];
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.clientsService.client = this.client;
          console.log(this.clientsService.client);
          this.getClientTickets(this.client.id);
        },
      });
    }
  }

  editClientHandler(): void {
    this.router.navigateByUrl('/intranet/clients/editer');
  }

  getClientTickets(clientId: number): void {
    this.clientsService.httpGetClientTickets(clientId).subscribe({
      next: (response) => {
        this.clientTicket = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
