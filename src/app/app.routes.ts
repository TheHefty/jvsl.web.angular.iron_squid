import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'challenges',
    loadChildren: () =>
      import('./features/challenges/challenges.routes').then(
        (c) => c.challengeRoutes
      ),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
