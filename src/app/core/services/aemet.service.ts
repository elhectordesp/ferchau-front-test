import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { Municipality } from '../models/municipality.model';

@Injectable({
  providedIn: 'root',
})
export class AemetService {
  private forecastUrl = 'http://localhost:8080/forecast';
  private municipalitiesUrl = 'http://localhost:8080/municipalities';

  constructor(private http: HttpClient) {}

  getForecast(
    municipality: string,
    measurementUnit?: string
  ): Observable<Forecast> {
    let url = `${this.forecastUrl}?municipalityId=${municipality}`;
    if (measurementUnit) url += `&measurementUnit=${measurementUnit}`;
    return this.http.get<Forecast>(url);
  }

  getMunicipalities(name: string): Observable<Municipality[]> {
    return this.http
      .get<Municipality[]>(`${this.municipalitiesUrl}?name=${name}`)
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
