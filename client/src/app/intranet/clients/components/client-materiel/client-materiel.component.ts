import { Component, Input } from '@angular/core';
import { Inventaire } from '../../utils/models/models';

@Component({
  selector: 'app-client-materiel',
  templateUrl: './client-materiel.component.html',
  styleUrls: ['./client-materiel.component.scss'],
})
export class ClientMaterielComponent {
  @Input() inventaire!: Inventaire;
}
