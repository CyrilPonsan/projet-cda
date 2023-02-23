import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  client!: Client;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.clientsService.client === undefined ||
      this.clientsService.client.length === 0
    ) {
      this.router.navigateByUrl('/intranet/clients');
    } else {
      this.client = this.clientsService.client[0];
    }
  }

  submitHandler(editedClient: Client): void {
    console.log(editedClient);

    this.clientsService
      .httpUpdateClient(editedClient, this.client.id)
      .subscribe({
        next: (_) => {},
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.clientsService.httpSearchClients(
            'contrat',
            editedClient.contrat
          );
        },
      });
  }
}
