import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Inventaire } from '../../utils/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-liste-materiels',
  templateUrl: './liste-materiels.component.html',
  styleUrls: ['./liste-materiels.component.scss'],
})
export class ListeMaterielsComponent {
  @Input() listeClientMateriels!: Array<Inventaire>;

  constructor(private router: Router, private clientsService: ClientsService) {}

  searchMaterielHandler(value: string): void {
    this.router.navigate([
      '/intranet/materiel/detail/',
      value,
      this.clientsService.client!.id,
    ]);
  }
}
