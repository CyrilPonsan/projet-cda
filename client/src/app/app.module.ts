import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './extranet/pages/connexion/connexion.component';
import { InputIsValidDirective } from './extranet/utils/directives/input-is-valid.directive';
import { PwdVisibilityDirective } from './extranet/utils/directives/pwd-visibility.directive';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './extranet/security/interceptors';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InputIsValidDirective,
    PwdVisibilityDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
