import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client, Materiel } from 'src/app/intranet/shared/models/models';
import { MaterielService } from '../../utils/services/materiel.service';
import { ClientsService } from 'src/app/intranet/clients/utils/services/clients.service';

@Component({
  selector: 'app-materiel-home',
  templateUrl: './materiel-home.component.html',
  styleUrls: ['./materiel-home.component.scss'],
})
export class MaterielHomeComponent implements OnInit, AfterViewInit {
  myControl = new FormControl(''); // ici je veux que le champ soit vide au chargement de la page
  options: string[] = []; // ici j'établis la liste des clients

  filteredOptions: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des clients filtrés
  selectedClient: Client | null = null; // ici j'initialise le client sélectionné

  clientMateriel: Materiel[] = []; // ici j'initialise la liste des matériels du client sélectionné
  clientList: { id: number; nom: string }[] = []; // ici j'initialise la liste des noms des clients

  clientsNameList: string[] = []; // ici j'initialise la liste des noms des clients

  // ici je déclare le paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public materielService: MaterielService,
    public clientService: ClientsService
  ) {
    
  }

  // ici je déclare la fonction qui permet de charger le paginator
  ngAfterViewInit() {}

  // ici je déclare la fonction qui permet de filtrer la liste des clients
  ngOnInit() {
    this.clientService.httpGelAllClients().subscribe({
      next: (response) => {
        const clients = response.data;
        clients.forEach((client: Client) => {
          const clientInfo = { id: client.id, nom: client.nom };
          this.clientList.push(clientInfo);
          this.clientsNameList.push(client.nom);
        });
        this.options = this.clientsNameList;
        console.log(this.options);

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value as string))
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        console.log(this.clientsNameList);
      },
    });

    this.myControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.myControl.valueChanges.subscribe(() => {
      this.onClientSelection();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientList
      .filter((client) => client.nom.toLowerCase().includes(filterValue))
      .map((client) => client.nom);
  }

  onClientSelection() {
    const clientId = this.clientList.find(client => client.nom === this.myControl.value)?.id;
    if (clientId) {
      this.materielService.getClientMateriels(clientId).subscribe({
        next: (materiels) => {
          this.clientMateriel = materiels;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.clientMateriel = [];
    }
  }
  
}
