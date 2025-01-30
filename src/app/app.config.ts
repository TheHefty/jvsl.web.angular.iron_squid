import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  createUrlTreeFromSnapshot,
  PreloadAllModules,
  provideRouter,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideIndexedDb } from 'ngx-indexed-db';
import { dbConfig } from './app-db-config';
import { routes } from './app.routes';
import { appEffects, appStore } from '@core/store/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withViewTransitions({
        onViewTransitionCreated: ({ transition, to }) => {
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideIndexedDb(dbConfig),
    provideStore(appStore),
    provideEffects(appEffects),
  ],
};
