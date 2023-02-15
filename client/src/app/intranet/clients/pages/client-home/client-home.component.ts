import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/intranet/shared/models/models';
import { PaginationService } from 'src/app/intranet/shared/services/pagination.service';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  clientList!: Array<Client>;
  searchType = 'nom';

  constructor(
    private clients: ClientsService,
    public pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.pagination.page = 1;
    this.getAllClients();
  }

  pageChangedHandler(): void {
    this.getAllClients();
  }

  setLimitHandler(value: any): void {
    this.pagination.max = value;
    this.getAllClients();
  }

  searchTypeChangeHandler(value: any): void {
    this.searchType = value;
  }

  searchSubmitHandler(value: string): void {}

  private getAllClients(): void {
    this.clients.httpGelAllClients().subscribe({
      next: (response) => {
        this.clientList = response.data;
        this.pagination.total = response.total;
        this.pagination.setPagesMax(response.total);
        this.pagination.setButtonsStyle(response.data.length);
        console.log(this.clientList);
      },
    });
  }
}
