import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielHomeComponent } from './pages/materiel-home/materiel-home.component';
import { MaterielRoutingModule } from './materiel-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NewMaterielComponent } from './pages/new-materiel/new-materiel.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MaterielDetailComponent } from './pages/materiel-detail/materiel-detail.component';
import { ClientsService } from '../clients/utils/services/clients.service';
import { SharedModule } from '../shared/shared.module';
import { MaterielService } from './utils/services/materiel.service';

@NgModule({
  declarations: [
    MaterielHomeComponent,
    NewMaterielComponent,
    MaterielDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterielRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    //MatPaginatorModule,
    MatTableModule,
    SharedModule,
  ],
  providers: [ClientsService, MaterielService],
})
export class MaterielModule {}
