import { Component, Output, OnInit, EventEmitter } from '@angular/core';
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
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private regex: RegexService) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexMail)],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexPassword)],
      ],
      prenom: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      nom: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      roles: [Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.userForm.valid) {
      console.log('well done!', this.userForm.value);
      this.userFormOutput.emit(this.userForm.value);
    }
  }
}
