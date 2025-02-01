import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IChallenge } from '@app/core/models/challenge.model';
import { selectCurrentChallenge } from '@app/core/store/selectors/challenges.selectors';
import { AppState } from '@app/core/store/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GearSetCardComponent } from './components/gear-set-card/gear-set-card.component';
import { MatchTableComponent } from './components/match-table/match-table.component';
import { CelebrationComponent } from '../../components/celebration/celebration.component';

@Component({
  selector: 'app-match-history',
  imports: [
    CommonModule,
    GearSetCardComponent,
    MatchTableComponent,
    CelebrationComponent,
  ],
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss',
})
export class MatchHistoryComponent {
  currentChallenge$: Observable<IChallenge | undefined>;

  constructor(private store: Store<AppState>) {
    this.currentChallenge$ = this.store.select(selectCurrentChallenge);
  }
}
