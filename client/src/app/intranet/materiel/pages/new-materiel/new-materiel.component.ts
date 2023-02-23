import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-new-materiel',
  templateUrl: './new-materiel.component.html',
  styleUrls: ['./new-materiel.component.scss']
})
export class NewMaterielComponent implements OnInit {
  selectedType: string | null = null;
  selectedMarque: string | null = null;
  selectedModele: string | null = null;
  options: string[] = ['Type 1 ', 'Type 2 ', 'Type 3 '];
  optionsMarque: string[] = ['Marque 1 ', 'Marque 2 ', 'Marque 3 '];
  optionsModele: string[] = ['Modele 1 ', 'Modele 2 ', 'Modele 3 '];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  filteredOptionsMarque: Observable<string[]> = new Observable<string[]>();
  filteredOptionsModele: Observable<string[]> = new Observable<string[]>();
  myControl = new FormControl(''); // ici je veux que le champ soit vide au chargement de la page


  constructor() { }

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
