import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modal!: any;
  @Output() modalLeftClick = new EventEmitter<void>();
  @Output() modalRightClick = new EventEmitter<void>();
  leftBtnHandler(): void {
    this.modalLeftClick.emit();
  }

  rightBtnHandler(): void {
    this.modalRightClick.emit();
  }
}
