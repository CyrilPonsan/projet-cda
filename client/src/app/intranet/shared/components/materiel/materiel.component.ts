import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Materiel } from 'src/app/intranet/shared/models/models';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss'],
})
export class MaterielComponent {
  @Input() materiel!: Materiel;

  constructor(private router: Router) {}

  urlHandle(): void {
    window.open(this.materiel.modele.url, '_blank');
  }
}
