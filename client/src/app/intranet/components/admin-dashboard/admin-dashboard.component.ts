import { Component, OnInit } from '@angular/core';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  userList!: Array<Conseiller>;

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.profilService.httpGetUserList().subscribe({
      next: (response) => {
        this.userList = response;
        console.log(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
