import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Forecast } from '../../../models/forecast.model';
import { WeatherDataComponent } from './weather-data.component';

describe('WeatherDataComponent', () => {
  let component: WeatherDataComponent;
  let fixture: ComponentFixture<WeatherDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatTableModule, WeatherDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDataComponent);
    component = fixture.componentInstance;
    component.weatherData = {
      probPrecipitacion: [],
      temperatura: { minima: 0, maxima: 0 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the municipality name', () => {
    component.municipalityName = 'Test Municipality';
    fixture.detectChanges();

    const h2Element = fixture.debugElement.query(By.css('h2'));
    expect(h2Element.nativeElement.textContent).toContain('Test Municipality');
  });

  it('should display mediaTemperatura and unit correctly', () => {
    const mockForecast: Forecast = {
      probPrecipitacion: [{ value: 10, periodo: '00-06' }],
      temperatura: { minima: 10, maxima: 20 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 15,
    };

    component.weatherData = mockForecast;
    fixture.detectChanges();

    const h1Element = fixture.debugElement.query(By.css('h1'));
    expect(h1Element.nativeElement.textContent).toContain('15ºC');
  });

  it('should render the precipitation probabilities and periods correctly', () => {
    const mockForecast: Forecast = {
      probPrecipitacion: [
        { value: 10, periodo: '00-06' },
        { value: 20, periodo: '06-12' },
      ],
      temperatura: { minima: 10, maxima: 20 },
      unidadTemperatura: 'G_CEL',
      mediaTemperatura: 15,
    };

    component.weatherData = mockForecast;
    fixture.detectChanges();

    const thElements = fixture.debugElement.queryAll(By.css('table thead th'));
    const tdElements = fixture.debugElement.queryAll(By.css('table tbody td'));

    expect(thElements.length).toBe(mockForecast.probPrecipitacion.length);
    expect(thElements[0].nativeElement.textContent).toContain('10 %');
    expect(thElements[1].nativeElement.textContent).toContain('20 %');

    expect(tdElements.length).toBe(mockForecast.probPrecipitacion.length);
    expect(tdElements[0].nativeElement.textContent).toContain('00-06');
    expect(tdElements[1].nativeElement.textContent).toContain('06-12');
  });
});
