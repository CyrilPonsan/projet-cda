import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent {
  constructor(private clientService: ClientsService, private router: Router) {}

  submitHandler(clientToAdd: Client): void {
    this.clientService.httpCreateClient(clientToAdd).subscribe({
      next: (_) => {},
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigate([
          '/intranet/clients/detail/',
          clientToAdd.contrat,
        ]);
      },
    });
  }
}
