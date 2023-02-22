import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';
import { MaterielRoutingModule } from './materiel-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [MaterielHomeComponent],
  imports: [
    CommonModule,
    MaterielRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    

    
  ],
})
export class MaterielModule {}
