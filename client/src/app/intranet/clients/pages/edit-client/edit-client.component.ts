import { Component } from '@angular/core';
import { Client } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent {
  client: Client = this.clientService.client[0];

  constructor(private clientService: ClientsService) {}

  submitHandler(editedClient: Client): void {}
}
