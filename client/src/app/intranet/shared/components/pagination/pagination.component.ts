import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Output() pageChanged = new EventEmitter<void>();
  @Output() max = new EventEmitter<number>();
  @Input() label!: string;

  constructor(public pagination: PaginationService) {}

  onClickPrevious() {
    this.pagination.page--;
    this.pageChanged.emit();
  }

  onClickNext() {
    this.pagination.page++;
    this.pageChanged.emit();
  }

  onSetMax(value: any) {
    this.pagination.page = 1;
    this.max.emit(+value.target.value);
  }
}
