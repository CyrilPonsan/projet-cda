import { Component } from '@angular/core';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(private profilService: ProfilService) {}

  handleSubmit(user: any): void {
    Object.assign(user, { roles: ['tech'] });
    if (user.isAdmin) {
      user.roles.push('admin');
    }
    this.profilService.httpCreateUser(user).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
