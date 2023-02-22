import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  client!: Client;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.clientsService.client[0] === null ||
      this.clientsService.client[0] === undefined
    ) {
      this.router.navigateByUrl('/intranet/clients');
    } else {
      this.client = this.clientsService.client[0];
    }
  }
}
