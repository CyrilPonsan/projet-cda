import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/intranet/shared/models/models';
import { ClientTicket, Inventaire } from '../../utils/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  client!: Client;
  clientTicket!: Array<ClientTicket>;
  listeClientMateriels!: Array<Inventaire>;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const contrat = this.route.snapshot.paramMap.get('contrat'); // Get contrat from url
    if (contrat !== null) { // If contrat is not null
      this.clientsService.httpSearchClients('contrat', contrat).subscribe({ // Search client by contrat
        next: (response) => { // If response is ok
          console.log(response); // Log response
          this.client = response[0]; // Set client to first element of response
        },
        error: (err) => {
          console.log(err); 
        },
        complete: () => { // When response is complete
          this.clientsService.client = this.client; // Set client to client service
          console.log(this.clientsService.client); // Log client 
          this.getClientTickets(); // Get client tickets 
          this.getClientMateriels(); // Get client materiels
        },
      });
    }
  }

  editClientHandler(): void { 
    this.router.navigateByUrl('/intranet/clients/editer'); // Navigate to edit client page
  }

  getClientTickets(): void {
    this.clientsService.httpGetClientTickets(this.client.id).subscribe({ // Get client tickets by client id 
      next: (response) => { // If response is ok
        this.clientTicket = response; // Set client tickets to response
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { // When response is complete
        console.log(this.clientTicket); // Log client tickets
      },
    });
  }

  getClientMateriels(): void { 
    this.clientsService.httpGetClientMateriels(this.client.id).subscribe({ // Get client materiels by client id 
      next: (response) => {  // If response is ok
        this.listeClientMateriels = response; // Set client materiels to response
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {}, 
    });
  }
}
