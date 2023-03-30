import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  conseiller!: Conseiller;

  constructor(
    private route: ActivatedRoute,
    private profilService: ProfilService, private router: Router
  ) {}

  ngOnInit(): void {
    //  récupération de l'identifiant du conseiller dans l'url
    const conseillerId = this.route.snapshot.paramMap.get('conseillerId');
    //  si un identifiant est présent dans l'url on récupère les données du conseiller
    if (conseillerId) {
      console.log(conseillerId);
      this.profilService.httpGetConseillerDetail(conseillerId).subscribe({
        next: (response) => (this.conseiller = response),
        error: (err) => console.log(err),
        complete: () => {},
      });
    }
  }

  handleSubmit(conseiller: Conseiller): void {
    this.profilService.httpUpdateConseiller(conseiller).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => this.router.navigateByUrl('/intranet/profil'),
    });
  }
}
