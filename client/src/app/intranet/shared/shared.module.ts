import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { PaginationService } from './services/pagination.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BtnPagesComponent } from './components/btn-pages/btn-pages.component';
import { SearchComponent } from './components/search/search.component';
import { NewInterventionFormComponent } from './components/new-intervention-form/new-intervention-form.component';

@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent /*
    SearchComponent,
    NewInterventionFormComponent, */,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent /*
    SearchComponent,
    NewInterventionFormComponent, */,
  ],
  providers: [PaginationService],
})
export class SharedModule {}
