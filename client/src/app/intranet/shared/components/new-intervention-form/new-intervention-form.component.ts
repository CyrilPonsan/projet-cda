import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-intervention-form',
  templateUrl: './new-intervention-form.component.html',
  styleUrls: ['./new-intervention-form.component.scss'],
})
export class NewInterventionFormComponent implements OnInit {
  interventionForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
