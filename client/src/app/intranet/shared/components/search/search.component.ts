import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, Subject } from 'rxjs';
import { RegexService } from 'src/app/extranet/utils/services/regex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();
  searchForm!: FormGroup;
  searchTerm$ = new Subject<string>();

  constructor(private regex: RegexService) {}

  ngOnInit(): void {
    this.searchTerm$
      .pipe(
        debounceTime(1000),
        map((term: string) => this.submitSearch(term))
      )
      .subscribe();
  }

  searchHandler(term: string): void {
    this.searchTerm$.next(term);
  }

  submitSearch(term: string): void {
    if (this.regex.regexGeneric.test(term)) {
      this.submitEvent.emit(term);
    }
  }
}
