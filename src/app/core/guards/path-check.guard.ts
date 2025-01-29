import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IChallenge } from '../models/challenge.model';
import { AppState } from '../store/store';
import { Injectable } from '@angular/core';
import { ChallengesActions } from '../store/actions/challenges.actions';
import { selectChallenges } from '../store/selectors/challenges.selectors';

@Injectable({
  providedIn: 'root',
})
export class PathCheckGuard implements CanActivate {
  challenges$;

  constructor(private store: Store<AppState>, private router: Router) {
    this.challenges$ = this.store.select(selectChallenges);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const id = Number(activatedRoute.paramMap.get('id'));

    return this.challenges$.pipe(
      map((challenges) => {
        if (challenges.find((c) => c.id === id)) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      })
    );
  }
}
