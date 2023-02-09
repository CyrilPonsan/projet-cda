import { Component, Input } from '@angular/core';
import { Intervention } from '../../utils/models/models';

@Component({
  selector: 'app-interventions-list',
  templateUrl: './interventions-list.component.html',
  styleUrls: ['./interventions-list.component.scss'],
})
export class InterventionsListComponent {
  @Input() interventions!: Array<Intervention>;
}
