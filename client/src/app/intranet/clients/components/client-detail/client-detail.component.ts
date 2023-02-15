import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  client = this.clientsService.client[0];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {}
}
