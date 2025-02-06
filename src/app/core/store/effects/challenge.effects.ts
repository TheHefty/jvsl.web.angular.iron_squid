import { Injectable } from '@angular/core';
import { ChallengeService } from '@app/core/services/challenge.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChallengesActions } from '../actions/challenges.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ChallengeEffects {
  loadChallenges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.loadChallenges),
      mergeMap(() =>
        this.challengeService.getChallenges().pipe(
          map((challenges) =>
            ChallengesActions.loadChallengesSuccess({ challenges })
          ),
          catchError((error) =>
            of(
              ChallengesActions.loadChallengesFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  addChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.addChallenge),
      mergeMap(({ challenge }) =>
        this.challengeService
          .addChallenge(challenge)
          .pipe(
            map((challenge) =>
              ChallengesActions.addChallengeSuccess({ challenge })
            )
          )
      )
    )
  );

  deleteChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.deleteChallenge),
      mergeMap(({ challengeId }) =>
        this.challengeService.deleteChallenge(challengeId).pipe(
          map((challenges) =>
            ChallengesActions.loadChallengesSuccess({ challenges })
          ),
          catchError((error) =>
            of(
              ChallengesActions.loadChallengesFailure({ error: error.message })
            )
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private challengeService: ChallengeService
  ) {}
}
