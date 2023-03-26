import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: ['@media print { button { display: none; } }'],
})
export class ButtonComponent implements OnInit {
  @Input() warning!: boolean; //  background color orange si "true"
  @Input() label!: string; //  label du bouton
  @Input() fullSize!: boolean;
  @Input() type!: string;
  setFullSize!: string; // le bouton prend toute la largeur du parent

  constructor() {}

  ngOnInit(): void {
    if (this.fullSize) {
      this.setFullSize = 'w-full block';
    }
  }
}
