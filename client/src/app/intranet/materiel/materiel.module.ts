import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';
import { MaterielRoutingModule } from './materiel-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NewMaterielComponent } from './pages/new-materiel/new-materiel.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';




@NgModule({
  declarations: [MaterielHomeComponent, NewMaterielComponent,  ],
  imports: [
    CommonModule,
    MaterielRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule
    

    
  ],
})
export class MaterielModule {}
