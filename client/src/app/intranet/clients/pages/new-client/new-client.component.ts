import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'src/app/extranet/utils/services/regex.service';
import { Client, RaisonSociale } from 'src/app/intranet/shared/models/models';
import { ClientsService } from '../../utils/services/clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent implements OnInit {
  clientForm!: FormGroup;
  raisonsSociales!: Array<RaisonSociale>;
  newClient!: Client;
  showNewRaisonSociale!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private regex: RegexService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.getRaisonsSociales();
    this.clientForm = this.formBuilder.group({
      raisonSocialeId: [null],
      nom: [null, [Validators.pattern(this.regex.regexGeneric)]],
      email: [null, [Validators.pattern(this.regex.regexMail)]],
      contrat: [null, [Validators.pattern(this.regex.regexGeneric)]],
      adresse: [null, [Validators.pattern(this.regex.regexGeneric)]],
      codePostal: [null, [Validators.pattern(this.regex.regexGeneric)]],
      ville: [null, [Validators.pattern(this.regex.regexGeneric)]],
      telephone: [null, [Validators.pattern(this.regex.regexGeneric)]],
    });
  }

  submitHandler(): void {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
      this.clientService.httpCreateClient(this.clientForm.value).subscribe({
        next: (response) => {
          this.newClient = response.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log(this.newClient);
        },
      });
    } else {
      console.log('oops');
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
