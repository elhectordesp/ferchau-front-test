import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Forecast } from '../../models/forecast.model';
import { Municipality } from '../../models/municipality.model';
import { AemetService } from '../../services/aemet.service';
import { AutocompleteComponent } from '../../shared/components/autocomplete/autocomplete.component';
import { TemperatureUnitSelectorComponent } from '../../shared/components/temperature-unit-selector/temperature-unit-selector.component';
import { WeatherDataComponent } from '../../shared/components/weather-data/weather-data.component';

@Component({
  selector: 'app-ferchau',
  templateUrl: './ferchau.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    AutocompleteComponent,
    TemperatureUnitSelectorComponent,
    WeatherDataComponent,
    WeatherDataComponent,
  ],
})
export class FerchauComponent {
  weatherData!: Forecast;
  municipalitySelected!: Municipality;
  unitSelected: string = 'G_CEL';

  constructor(private aemetService: AemetService) {}

  onMunicipalitySelectedChange(municipality: Municipality) {
    this.municipalitySelected = municipality;
    this.obtainForecast();
  }

  onUnitSelectedChange(unit: string) {
    this.unitSelected = unit;
    this.obtainForecast();
  }

  private obtainForecast() {
    if (this.unitSelected && this.municipalitySelected)
      this.aemetService
        .getForecast(this.municipalitySelected.id, this.unitSelected)
        .subscribe((forecast) => {
          this.weatherData = forecast;
        });
  }
}
