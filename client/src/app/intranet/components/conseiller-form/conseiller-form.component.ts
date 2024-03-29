import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Conseiller from 'src/app/extranet/utils/models/conseiller.model';
import { RegexService } from 'src/app/extranet/utils/services/regex.service';

@Component({
  selector: 'app-conseiller-form',
  templateUrl: './conseiller-form.component.html',
  styleUrls: ['./conseiller-form.component.scss'],
})
export class ConseillerFormComponent implements OnInit {
  @Output() userFormOutput = new EventEmitter<Conseiller>();
  @Input() userToEdit!: Conseiller;
  editedUser!: Conseiller;
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private regex: RegexService) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexMail)],
      ],
      password: [null],
      prenom: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      nom: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      isAdmin: [false, [Validators.required]],
    });

    if (this.userToEdit !== undefined && this.userToEdit !== null) {
      this.userForm.patchValue(this.userToEdit);
    }
  }

  handleSubmit(): void {
    if (this.userForm.valid) {
      if (!this.userToEdit) {
        if (this.regex.regexPassword.test(this.userForm.value.password)) {
          this.userFormOutput.emit(this.userForm.value);
        } else {
          return;
        }
      } else {
        Object.assign(this.userForm.value, { id: this.userToEdit.id });
        if (this.userForm.value.password) {
          if (this.regex.regexPassword.test(this.userForm.value.password)) {
            this.userFormOutput.emit(this.userForm.value);
          } else {
            return;
          }
        } else {
          delete this.userForm.value.password;
          this.userFormOutput.emit(this.userForm.value);
        }
      }
    }
  }
}
