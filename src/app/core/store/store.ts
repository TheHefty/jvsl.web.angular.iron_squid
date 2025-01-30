import { Action, ActionReducer } from '@ngrx/store';
import { ChallengeEffects } from './effects/challenge.effects';
import {
  challengesReducer,
  ChallengeState,
} from './reducers/challenges.reducer';

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
