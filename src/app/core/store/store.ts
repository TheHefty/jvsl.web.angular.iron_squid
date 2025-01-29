import { Action, ActionReducer } from '@ngrx/store';
import {
  challengesReducer,
  ChallengeState,
} from './reducers/challenges.reducer';
import { ChallengeEffects } from './effects/challenge.effects';

export interface AppState {
  challenges: ChallengeState;
}

export interface AppStore {
  challenges: ActionReducer<ChallengeState, Action>;
}

export const appStore: AppStore = {
  challenges: challengesReducer,
};

export const appEffects = [ChallengeEffects];
