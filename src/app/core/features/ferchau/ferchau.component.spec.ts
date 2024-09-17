import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Forecast } from '../../models/forecast.model';
import { Municipality } from '../../models/municipality.model';
import { AemetService } from '../../services/aemet.service';
import { AutocompleteComponent } from '../../shared/components/autocomplete/autocomplete.component';
import { TemperatureUnitSelectorComponent } from '../../shared/components/temperature-unit-selector/temperature-unit-selector.component';
import { WeatherDataComponent } from '../../shared/components/weather-data/weather-data.component';
import { FerchauComponent } from './ferchau.component';

describe('FerchauComponent', () => {
  let component: FerchauComponent;
  let fixture: ComponentFixture<FerchauComponent>;
  let aemetService: jasmine.SpyObj<AemetService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AemetService', ['getForecast']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FerchauComponent,
        AutocompleteComponent,
        TemperatureUnitSelectorComponent,
        WeatherDataComponent,
      ],
      providers: [{ provide: AemetService, useValue: spy }],
    }).compileComponents();

    aemetService = TestBed.inject(AemetService) as jasmine.SpyObj<AemetService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FerchauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getForecast and update weatherData on municipality selection change', () => {
    const mockForecast: Forecast = {
      probPrecipitacion: [{ value: 10, periodo: '00-06' }],
      temperatura: { minima: 10, maxima: 20 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 15,
    };

    aemetService.getForecast.and.returnValue(of(mockForecast));
    const municipality: Municipality = { id: '1', name: 'Test Municipality' };

    component.onMunicipalitySelectedChange(municipality);

    expect(aemetService.getForecast).toHaveBeenCalledWith(
      '1',
      component.unitSelected
    );
    expect(component.weatherData).toEqual(mockForecast);
  });

  it('should call getForecast and update weatherData on unit selection change', () => {
    const mockForecast: Forecast = {
      probPrecipitacion: [{ value: 10, periodo: '00-06' }],
      temperatura: { minima: 10, maxima: 20 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 15,
    };

    aemetService.getForecast.and.returnValue(of(mockForecast));
    component.municipalitySelected = { id: '1', name: 'Test Municipality' };
    component.unitSelected = 'G_CEL';

    component.onUnitSelectedChange('G_FAH');

    expect(aemetService.getForecast).toHaveBeenCalledWith('1', 'G_FAH');
    expect(component.weatherData).toEqual(mockForecast);
  });

  it('should display weather data when it is available', () => {
    const mockForecast: Forecast = {
      probPrecipitacion: [{ value: 10, periodo: '00-06' }],
      temperatura: { minima: 10, maxima: 20 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 15,
    };

    component.weatherData = mockForecast;
    component.municipalitySelected = { id: '1', name: 'Test Municipality' };
    fixture.detectChanges();

    const weatherDataElement =
      fixture.nativeElement.querySelector('app-weather-data');
    expect(weatherDataElement).toBeTruthy();
    expect(weatherDataElement.textContent).toContain('15');
  });
});
