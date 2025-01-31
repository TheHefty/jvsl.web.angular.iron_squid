import { Action, ActionReducer } from '@ngrx/store';
import { ChallengeEffects } from './effects/challenge.effects';
import {
  challengesReducer,
  ChallengeState,
} from './reducers/challenges.reducer';
import { gearInfoReducer, GearInfoState } from './reducers/gear-infos.reducer';
import { GearInfosEffects } from './effects/gear-info.effects';

export interface AppState {
  challenges: ChallengeState;
  gearInfos: GearInfoState;
}

export interface AppStore {
  challenges: ActionReducer<ChallengeState, Action>;
  gearInfos: ActionReducer<GearInfoState, Action>;
}

export const appStore: AppStore = {
  challenges: challengesReducer,
  gearInfos: gearInfoReducer,
};

export const appEffects = [ChallengeEffects, GearInfosEffects];
