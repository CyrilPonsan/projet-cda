import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { PaginationService } from './services/pagination.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BtnPagesComponent } from './components/btn-pages/btn-pages.component';
import { SearchComponent } from './components/search/search.component';
import { ClientComponent } from './components/client/client.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { PwdVisibilityDirective } from './directives/pwd-visibility.directive';
import { InputIsValidDirective } from './directives/input-is-valid.directive';

@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent,
    SearchComponent,
    ClientComponent,
    MaterielComponent,
    PwdVisibilityDirective,
    InputIsValidDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    ModalComponent,
    ButtonComponent,
    PaginationComponent,
    BtnPagesComponent,
    SearchComponent,
    ClientComponent,
    MaterielComponent,
  ],
  providers: [PaginationService],
})
export class SharedModule {}
