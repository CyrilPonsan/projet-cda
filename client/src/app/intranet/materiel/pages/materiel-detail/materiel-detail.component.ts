import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Materiel } from 'src/app/intranet/shared/models/models';
import { MaterielService } from '../../utils/services/materiel.service';

@Component({
  selector: 'app-materiel-detail',
  templateUrl: './materiel-detail.component.html',
  styleUrls: ['./materiel-detail.component.scss'],
})
export class MaterielDetailComponent implements OnInit {
  materiel!: Materiel;
  client!: Client;
  noDataError!: boolean;

  constructor(
    private materielService: MaterielService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (ref !== null && clientId !== null) {
      this.materielService.getMateriel(ref, clientId).subscribe({
        next: (response) => {
          console.log(response);

          this.materiel = response.data.materiel;
          this.client = response.data.client;
          this.noDataError = false;
        },
        error: (err) => {
          console.log(err);
          this.noDataError = true;
        },
        complete: () => {},
      });
    }
  }

  backToClient(): void {
    this.router.navigate(['/intranet/clients', this.client.contrat]);
  }
}
