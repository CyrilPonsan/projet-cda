import { Component } from '@angular/core';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  constructor(public profilService: ProfilService) {}
}
