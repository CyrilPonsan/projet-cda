import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Materiel } from 'src/app/intranet/shared/models/models';
import { MaterielService } from '../../utils/services/materiel.service';

@Component({
  selector: 'app-materiel-detail',
  templateUrl: './materiel-detail.component.html',
  styleUrls: ['./materiel-detail.component.scss'],
})
export class MaterielDetailComponent implements OnInit {
  materiel!: Materiel;

  constructor(
    private materielService: MaterielService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    if (ref !== null) {
      this.materielService.getMateriel(ref).subscribe({
        next: (response) => {
          this.materiel = response;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }
}
