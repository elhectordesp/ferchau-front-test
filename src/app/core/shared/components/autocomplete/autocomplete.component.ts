import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Municipality } from '../../../models/municipality.model';
import { AemetService } from '../../../services/aemet.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class AutocompleteComponent implements OnInit {
  municipalityControl = new FormControl();
  filteredMunicipalitys: Observable<Municipality[]> = new Observable<
    Municipality[]
  >();
  private searchTerms = new Subject<string>();
  @Output() municipalitySelected = new EventEmitter<Municipality>();

  constructor(private aemetService: AemetService) {}

  ngOnInit() {
    this.filteredMunicipalitys = this.searchTerms.pipe(
      startWith(''),
      switchMap((value) =>
        this.aemetService
          .getMunicipalities(value || '')
          .pipe(
            map((municipalities) =>
              municipalities.filter((municipality) =>
                municipality?.name?.toLowerCase().includes(value.toLowerCase())
              )
            )
          )
      )
    );

    this.municipalityControl.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        this.searchTerms.next(value);
      } else {
        this.municipalitySelected.emit(value);
      }
    });
  }

  displayFn(municipality: Municipality): string {
    return municipality && municipality.name ? municipality.name : '';
  }
}
