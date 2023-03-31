import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(private profilService: ProfilService, private router: Router) {}

  handleSubmit(user: any): void {
    if (user.isAdmin) {
      Object.assign(user, { roles: ['admin'] });
    } else {
      Object.assign(user, { roles: ['tech'] });
    }
    this.profilService.httpCreateUser(user).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => this.router.navigateByUrl('/intranet/profil'),
    });
  }
}
