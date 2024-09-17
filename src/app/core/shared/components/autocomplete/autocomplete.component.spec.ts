import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Municipality } from '../../../models/municipality.model';
import { AemetService } from '../../../services/aemet.service';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  let aemetService: jasmine.SpyObj<AemetService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AemetService', ['getMunicipalities']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AutocompleteComponent,
      ],
      providers: [{ provide: AemetService, useValue: spy }],
    }).compileComponents();

    aemetService = TestBed.inject(AemetService) as jasmine.SpyObj<AemetService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle empty municipality name in displayFn', () => {
    const result = component.displayFn(null as any);
    expect(result).toBe('');
  });

  it('should filter municipalities based on user input', fakeAsync(() => {
    const mockMunicipalities: Municipality[] = [
      { id: '1', name: 'Madrid' },
      { id: '2', name: 'Barcelona' },
    ];
    aemetService.getMunicipalities.and.returnValue(of(mockMunicipalities));
    component.municipalityControl.setValue('Mad');
    tick();
    fixture.detectChanges();

    component.filteredMunicipalitys.subscribe((municipalities) => {
      expect(municipalities.length).toBe(2);
      expect(municipalities[0].name).toBe('Madrid');
    });
  }));
});
