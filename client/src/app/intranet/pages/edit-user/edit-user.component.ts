import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //  récupération de l'identifiant du conseiller dans l'url
    const conseillerId = this.route.snapshot.paramMap.get('conseillerId');
    if (conseillerId) {
      console.log(conseillerId);
    }
  }

  handleSubmit(conseiller: Conseiller): void {}
}
