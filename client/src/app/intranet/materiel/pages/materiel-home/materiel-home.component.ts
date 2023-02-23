import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-materiel-home',
  templateUrl: './materiel-home.component.html',
  styleUrls: ['./materiel-home.component.scss']
})
export class MaterielHomeComponent implements OnInit {
  myControl = new FormControl(''); // ici je veux que le champ soit vide au chargement de la page
  options: string[] = ['Client 1 ', 'Client 2 ', 'Client 3 ']; // ici j'établis la liste des clients
  filteredOptions: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des clients filtrés
  selectedClient: string | null = null; // ici j'initialise le client sélectionné


  ngOnInit() {
    this.myControl.valueChanges.subscribe(value => {
      console.log(value);
    });
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as string ))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}




