import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,   //animación opcional para los componentes compatibles, como los botones
      inputVariant: 'filled',    //
      zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
      },
      theme: {
        preset: Lara,  // Aura, Material, Lara y Nora
          options: {
            prefix: 'p',
            darkModeSelector: 'class',
            cssLayer: false
          }
      }
    })]
};
