import { Component, Input } from '@angular/core';
import { slide } from '../../animations/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [slide],
})
export class SidebarComponent {
  @Input() isReacOpen!: boolean;
}
