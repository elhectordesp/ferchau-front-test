import { HttpClientModule } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FerchauComponent } from './core/features/ferchau/ferchau.component';
import { AemetService } from './core/services/aemet.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FerchauComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AemetService, { provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class AppComponent {
  title = 'ferchau-front';

  constructor() {}
}
