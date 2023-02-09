import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Materiel } from 'src/app/intranet/tickets/utils/models/models';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss'],
})
export class MaterielComponent {
  @Input() materiel!: Materiel;

  constructor(private router: Router) {}

  urlHandle(): void {
    this.router.navigateByUrl(this.materiel.modele.url);
  }
}
