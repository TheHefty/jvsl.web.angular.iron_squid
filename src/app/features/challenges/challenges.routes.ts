import { Routes } from '@angular/router';
import { ChallengeHistoryComponent } from './pages/challenge-history/challenge-history.component';
import { MatchHistoryComponent } from './pages/match-history/match-history.component';
import { PathCheckGuard } from '@app/core/guards/path-check.guard';

export const challengeRoutes: Routes = [
  { path: '', component: ChallengeHistoryComponent },
  {
    path: 'id/:id',
    component: MatchHistoryComponent,
    canActivate: [PathCheckGuard],
  },
];
