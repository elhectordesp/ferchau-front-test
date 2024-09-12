import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Forecast } from '../../../models/forecast.model';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class WeatherDataComponent implements OnInit {
  @Input()
  weatherData!: Forecast;
  @Input()
  municipalityName!: string;
  date: Date = new Date();
  displayedColumns: string[] = ['value'];

  constructor() {}

  ngOnInit() {
    this.date.setDate(new Date().getDate() + 1);
  }
}
