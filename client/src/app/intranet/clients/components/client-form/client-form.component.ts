import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/extranet/utils/services/regex.service';
import { Client, RaisonSociale } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Output() newClient = new EventEmitter<Client>(); // Emit new client
  @Input() clientToEdit!: Client; // Client to edit
  editedClient!: Client; // Edited client
  clientForm!: FormGroup; // Client form group (reactive form) to edit or create a new client
  raisonsSociales!: Array<RaisonSociale>; // Raisons sociales list to select
  showNewRaisonSociale!: boolean; // Show new raison sociale input field (true) or not (false)

  constructor(
    private formBuilder: FormBuilder, // Form builder to create the form group
    private regex: RegexService, // Regex service to use regex patterns
    private clientService: ClientsService // Client service to get and add new raison sociale
  ) {}

  ngOnInit(): void {
    this.getRaisonsSociales();
    this.clientForm = this.formBuilder.group({
      raisonSocialeId: [null],
      nom: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexMail)],
      ],
      contrat: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      adresse: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      codePostal: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      ville: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      telephone: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
    });
    if (this.clientToEdit !== undefined && this.clientToEdit !== null) {
      this.clientForm.patchValue(this.clientToEdit);
      this.clientForm.valueChanges.subscribe((value) => {
        this.editedClient = { ...value };
      });
    }
  }

  submitHandler(): void {
    if (this.clientForm.valid) {
      this.newClient.emit(this.clientForm.value);
    } else {
      console.log('oops', this.clientForm.value);
    }
  }

  raisonSocialeHandler(value: string): void {
    this.clientService.httpAddRaisonSociale(value).subscribe({
      next: (response) => {
        this.raisonsSociales.push(response.newRaisonSociale);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.showNewRaisonSociale = false;
      },
    });
  }

  private getRaisonsSociales(): void {
    this.clientService.httpGetRaisonsSociales().subscribe({
      next: (response) => {
        this.raisonsSociales = response.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.raisonsSociales);
      },
    });
  }
}
