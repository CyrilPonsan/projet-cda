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
  selectedType: string | null = null; // ici j'initialise le type sélectionné
  selectedMarque: string | null = null; // ici j'initialise la marque sélectionnée
  selectedModele: string | null = null; // ici j'initialise le modèle sélectionné

  options: string[] = ['Type 1 ', 'Type 2 ', 'Type 3 ']; // ici j'établis la liste des types
  optionsMarque: string[] = ['Marque 1 ', 'Marque 2 ', 'Marque 3 ']; // ici j'établis la liste des marques
  optionsModele: string[] = ['Modele 1 ', 'Modele 2 ', 'Modele 3 ']; // ici j'établis la liste des modèles
  
  filteredOptions: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des types filtrés
  filteredOptionsMarque: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des marques filtrées
  filteredOptionsModele: Observable<string[]> = new Observable<string[]>(); // ici j'initialise la liste des modèles filtrés
  myControl = new FormControl(''); // ici je veux que le champ soit vide au chargement de la page

  showNewType: boolean = false;
  showNewMarque: boolean = false;
  showNewModele: boolean = false;

  newType: any[] = [];
  newMarque: string[] = [];
  newModele: string[] = [];

  newTypeAdded: boolean = false;
  newMarqueAdded: boolean = false;
  newModeleAdded: boolean = false;


  typeAdded = false;





  constructor() { }

    ngOnInit() {
      this.myControl.valueChanges.subscribe(value => {
        console.log(value);
      });
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value as string ))
      );

      this.filteredOptionsMarque = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMarque(value as string ))
      );

      this.filteredOptionsModele = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModele(value as string ))
      );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));

    }

    private _filterMarque(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.optionsMarque.filter(option => option.toLowerCase().includes(filterValue));

    }


    private _filterModele(value: string): string[] {

      const filterValue = value.toLowerCase();
  
      return this.optionsModele.filter(option => option.toLowerCase().includes(filterValue));

    }

    addNewType() {
      this.options = this.options.concat(this.newType);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value as string ))
      );
      this.newType = [];
      this.showNewType = false;
      this.typeAdded = true;
    }

    addNewMarque() {
      this.optionsMarque = this.optionsMarque.concat(this.newMarque);

      this.filteredOptionsMarque = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMarque(value as string ))
      );
      this.newMarque = [];
      this.showNewMarque = false;
      this.newMarqueAdded = true;
    }

    addNewModele() {
      this.optionsModele = this.optionsModele.concat(this.newModele);
      this.filteredOptionsModele = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModele(value as string ))
      );
      this.newModele = [];
      this.showNewModele = false;
      this.newModeleAdded = true;
    }
    

}
