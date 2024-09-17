import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemperatureUnitSelectorComponent } from './temperature-unit-selector.component';

describe('TemperatureUnitSelectorComponent', () => {
  let component: TemperatureUnitSelectorComponent;
  let fixture: ComponentFixture<TemperatureUnitSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        CommonModule,
        BrowserAnimationsModule,
        TemperatureUnitSelectorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected unit on selection change', () => {
    spyOn(component.unitSelected, 'emit');

    component.selectedUnit = 'G_FAH';
    component.onUnitChange();

    expect(component.unitSelected.emit).toHaveBeenCalledWith('G_FAH');
  });
});
