import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  options: string[] = ['Client 1 ', 'Client 2 ', 'Client 3 ']; // ici j'établis la liste des clients
  filteredOptions: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des clients filtrés
  selectedClient: string | null = null; // ici j'initialise le client sélectionné
  
  clientMateriel: Materiel[] = []; // ici j'initialise la liste des matériels du client sélectionné
  clientsNameList: string[] = []; // ici j'initialise la liste des noms des clients

  // ici je déclare les colonnes de la table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'michel'];
  // ici je déclare les données de la table
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // ici je déclare le paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private materielService: MaterielService , clientService: ClientsService) {
    // Get all clients's name
    clientService.httpGelAllClients().subscribe({
      next: (response) => {
        const clients = response.data; // Extract the array of clients from the response
        clients.forEach((client: Client) => {
          this.clientsNameList.push(client.nom);
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        console.log(this.clientsNameList);
      },
    });

    
  
  


    //get Materiel by client id
    this.materielService.getClientMateriels(1).subscribe({
      next: (materiel) => {
        this.clientMateriel = materiel;
        // materiel.forEach((item) => {
        //   console.log(`ID: ${item.id}`);
        //   console.log(`Reference: ${item.ref}`);
        //   console.log(`Date of commissioning: ${item.miseEnService}`);
        //   console.log(`Equipment type: ${item.typeMateriel.type}`);
        //   console.log(`Brand: ${item.marque.marque}`);
        //   console.log(`Model: ${item.modele.modele}`);
        //   console.log(`Model URL: ${item.modele.url}`);
        // });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');       
      },
    });
    
  }


  // ici je déclare la fonction qui permet de charger le paginator
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // ici je déclare la fonction qui permet de filtrer la liste des clients
  ngOnInit() {
    this.myControl.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value as string))
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  michel: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', michel: 'michel'  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' , michel: 'michel' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' , michel: 'michel' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', michel: 'michel'  },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' , michel: 'michel' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' , michel: 'michel' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' , michel: 'michel' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' , michel: 'michel' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' , michel: 'michel' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' , michel: 'michel' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' , michel: 'michel' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' , michel: 'michel' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' , michel: 'michel' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', michel: 'michel'  },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', michel: 'michel'  },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' , michel: 'michel' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' , michel: 'michel' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' , michel: 'michel' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', michel: 'michel'  },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' , michel: 'michel' },
];
