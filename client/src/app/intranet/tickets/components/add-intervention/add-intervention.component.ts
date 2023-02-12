import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from 'src/app/extranet/utils/services/profil.service';
import { RegexService } from 'src/app/extranet/utils/services/regex.service';
import { Statut } from '../../utils/models/models';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.scss'],
})
export class AddInterventionComponent implements OnInit {
  @Output() newInterv = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  intervForm!: FormGroup;
  statuts!: Array<Statut>;

  constructor(
    public tck: TicketsService,
    private formBuilder: FormBuilder,
    private regex: RegexService,
    public profil: ProfilService
  ) {}

  ngOnInit(): void {
    if (!this.tck.statuts) {
      this.tck.httpGetStatuts();
    }
    this.intervForm = this.formBuilder.group({
      titre: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      statut: [null, [Validators.required]],
      lieuIntervention: [null, [Validators.required]],
      description: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
      reponse: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexGeneric)],
      ],
    });
  }

  submitHandler(): void {
    if (this.intervForm.valid) {
      if (
        this.intervForm.value.statut === '5' &&
        !this.profil.user.roles.includes('admin')
      ) {
        return;
      }
      this.newInterv.emit(this.intervForm.value);
      this.intervForm.reset();
    }
  }

  cancelHandler(): void {
    this.intervForm.reset();
    this.cancel.emit();
  }
}
