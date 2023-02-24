import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchType = 'contrat';

  constructor(
    private clients: ClientsService,
    public pagination: PaginationService,
    private router: Router
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
    console.log(value.target.value);

    this.searchType = value.target.value;
  }

  searchSubmitHandler(value: string): void {
    if (this.searchType === 'contrat') {
      this.router.navigate(['/intranet/clients/detail/', value]);
    } else if (this.searchType === 'nom') {
      this.searchClientByNom(value);
    }
  }

  detailsNavigationHandler(contrat: string): void {
    this.router.navigate(['/intranet/clients/detail/', contrat]);
  }

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

  private searchClientByNom(nom: string): void {
    this.clients.httpSearchClients('nom', nom).subscribe({
      next: (response) => {
        this.clientList = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
