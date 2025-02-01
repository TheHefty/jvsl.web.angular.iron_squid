import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appEffects, appStore } from '@core/store/store';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideIndexedDb } from 'ngx-indexed-db';
import { dbConfig } from './app-db-config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideIndexedDb(dbConfig),
    provideStore(appStore),
    provideEffects(appEffects),
  ],
};
