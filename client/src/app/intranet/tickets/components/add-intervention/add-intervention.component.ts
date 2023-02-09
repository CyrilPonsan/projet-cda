import { Component } from '@angular/core';
import { TicketsService } from '../../utils/services/tickets.service';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.scss'],
})
export class AddInterventionComponent {
  constructor(public tck: TicketsService) {}
}
