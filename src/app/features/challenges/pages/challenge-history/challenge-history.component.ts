import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { IChallenge } from '@app/core/models/challenge.model';
import { ChallengesActions } from '@app/core/store/actions/challenges.actions';
import {
  selectChallenges,
  selectLoading,
} from '@app/core/store/selectors/challenges.selectors';
import { AppState } from '@app/core/store/store';
import { createEmptyChallenge } from '@app/core/utils/utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChallengesTableComponent } from './challenges-table/challenges-table.component';

@Component({
  selector: 'app-challenge-history',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ChallengesTableComponent,
  ],
  templateUrl: './challenge-history.component.html',
  styleUrl: './challenge-history.component.scss',
})
export class ChallengeHistoryComponent {
  challenges$: Observable<IChallenge[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.challenges$ = this.store.select(selectChallenges);
  }

  newChallenge(): void {
    this.store.dispatch(
      ChallengesActions.addChallenge({ challenge: createEmptyChallenge() })
    );
    this.router.navigate(['challenges/current']);
  }
}
