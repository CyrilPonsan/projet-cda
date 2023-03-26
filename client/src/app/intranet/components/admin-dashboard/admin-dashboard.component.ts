import { Component, OnInit } from '@angular/core';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  showModal!: boolean;
  showModalError!: boolean;
  showModalSuccess!: boolean;

  userToDelete!: number | null;

  modalError = {
    titre: 'Erreur',
    message: 'Problème serveur, réessayez plus tard...',
    rightBtn: 'Fermer',
  };
  modalSuccess = {
    titre: 'Erreur',
    message: '',
    rightBtn: 'Fermer',
  };
  modal = {
    titre: 'Suppression du conseiller',
    message: 'Confirmer la suppression du conseiller svp',
    leftBtn: 'Annuler',
    rightBtn: 'Confirmer',
  };

  userList!: Array<Conseiller>;

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  handleDeleteUser(userId: number): void {
    this.userToDelete = Number(userId);
    this.showModal = true;
  }

  handleModalLeftClick(): void {
    this.showModal = false;
  }

  handleModalRightClick(): void {
    this.profilService.httpDeleteUser(this.userToDelete!).subscribe({
      next: (response) => {
        if (response.result) {
          this.modalSuccess.message = response.message;
          this.showModal = false;
          this.showModalSuccess = true;
        } else {
          this.showModal = false;
          this.showModalError = true;
        }
      },
      error: (err) => {
        this.showModalError = true;
      },
      complete: () => {
        this.userToDelete = null;
        this.getUserList();
      },
    });
    this.userToDelete = null;
  }

  handleModalSuccessClick(): void {
    this.showModalSuccess = false;
  }

  handleModalErrorClick(): void {
    this.showModalError = false;
  }

  // retourne la liste des conseillers
  private getUserList(): void {
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
