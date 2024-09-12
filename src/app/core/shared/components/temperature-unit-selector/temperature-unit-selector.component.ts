import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-temperature-unit-selector',
  templateUrl: './temperature-unit-selector.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
})
export class TemperatureUnitSelectorComponent {
  units = [
    { id: 'G_CEL', name: 'Celsius' },
    { id: 'G_FAH', name: 'Fahrenheit' },
  ];
  selectedUnit = '';

  @Output() unitSelected = new EventEmitter<string>();

  onUnitChange() {
    if (this.selectedUnit) {
      this.unitSelected.emit(this.selectedUnit);
    }
  }
}
