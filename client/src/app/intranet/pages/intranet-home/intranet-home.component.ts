import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/extranet/utils/services/connexion.service';

@Component({
  selector: 'app-intranet-home',
  templateUrl: './intranet-home.component.html',
  styleUrls: ['./intranet-home.component.scss'],
})
export class IntranetHomeComponent {
  constructor(public conn: ConnexionService) {}
}
