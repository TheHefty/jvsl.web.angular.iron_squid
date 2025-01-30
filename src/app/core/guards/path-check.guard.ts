import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IChallenge } from '../models/challenge.model';
import { AppState } from '../store/store';
import { Injectable } from '@angular/core';
import { ChallengesActions } from '../store/actions/challenges.actions';
import {
  selectChallenges,
  selectCurrentChallenge,
} from '../store/selectors/challenges.selectors';

@Injectable({
  providedIn: 'root',
})
export class PathCheckGuard implements CanActivate {
  challenges$;

  constructor(private store: Store<AppState>, private router: Router) {
    this.challenges$ = this.store.select(selectCurrentChallenge);
  }

  canActivate(): Observable<boolean> {
    return this.challenges$.pipe(
      map((challenge) => {
        if (challenge) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      })
    );
  }
}
