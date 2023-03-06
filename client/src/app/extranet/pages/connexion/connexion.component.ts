import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from '../../utils/services/connexion.service';
import { ProfilService } from '../../utils/services/profil.service';
import { RegexService } from '../../utils/services/regex.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;
  isEmailModified = false;
  isPasswordModified = false;
  isEmailValid = true;
  isPasswordValid = true;
  loader = false;
  hasError = false;
  credentialsError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private regex: RegexService,
    private conn: ConnexionService,
    private profil: ProfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexMail)],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexPassword)],
      ],
    });
  }

  //  vérifie la validité de l'email qd le champs email perd le focus
  emailBlurHandler(): void {
    this.isEmailModified = true;
    this.isEmailValid = this.regex.regexMail.test(
      this.loginForm.value.username
    );
  }

  //  vérifie la validité du password qd le champs password perd le focus
  passwordBlurHandler(): void {
    this.isPasswordModified = true;
    this.isPasswordValid = this.regex.regexPassword.test(
      this.loginForm.value.password
    );
  }

  //  connexion
  submitLoginHandler(): void {
    if (this.loginForm.valid) {
      this.credentialsError = false;
      this.conn
        .httpConnexion(
          this.loginForm.value.username.trim(),
          this.loginForm.value.password.trim()
        )
        .subscribe({
          next: (response) => {
            this.profil.user = response.user;
          },
          error: (err) => (this.credentialsError = true),
          complete: () => this.router.navigateByUrl('intranet'),
        });
    }
  }
}
