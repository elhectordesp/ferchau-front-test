import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { Municipality } from '../models/municipality.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AemetService {
  private forecastEndpoint = '/forecast';
  private municipalitiesEndpoint = '/municipalities';

  constructor(private httpClientService: HttpClientService) {}

  getForecast(
    municipality: string,
    measurementUnit?: string
  ): Observable<Forecast> {
    let url = `${this.forecastEndpoint}?municipalityId=${municipality}`;
    if (measurementUnit) url += `&measurementUnit=${measurementUnit}`;
    return this.httpClientService.get<Forecast>(url);
  }

  getMunicipalities(name: string): Observable<Municipality[]> {
    return this.httpClientService
      .get<Municipality[]>(`${this.municipalitiesEndpoint}?name=${name}`)
      .pipe(
        map((response) => {
          return response.map((municipality: Municipality) => ({
            id: municipality.id?.replace('id', ''),
            name: municipality.name,
          }));
        })
      );
  }
}
