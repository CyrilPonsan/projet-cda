import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { ConseillersService } from '../../utils/services/conseillers.service';

@Component({
  selector: 'app-edit-conseiller',
  templateUrl: './edit-conseiller.component.html',
  styleUrls: ['./edit-conseiller.component.scss']
})

export class EditConseillerComponent implements OnInit{
  
  conseiller!: Conseiller;
  
  constructor(private conseillersService: ConseillersService, private router: Router) {}

  ngOnInit(): void {
    if (
      this.conseillersService.conseiller === undefined ||
      this.conseillersService.conseiller === null
    ) {
      this.router.navigateByUrl('/intranet/conseiller');
    } else {
      this.conseiller = this.conseillersService.conseiller;
    }
  }

  submitHandler(editedConseiller: Conseiller): void {
    console.log(editedConseiller);

    this.conseillersService
      .httpUpdateConseiller(editedConseiller, this.conseiller.id)
      .subscribe({
        next: (_) => {},
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate([
            // TODO: ARREGLAR ERROR
            // '/intranet/conseiller/detail/',
            // editedConseiller.contrat,
          ]);
        },
      });
  }

}
