import { IChallenge } from '@app/core/models/challenge.model';
import { ChallengesActions } from '../actions/challenges.actions';
import { createReducer, on } from '@ngrx/store';

export interface ChallengeState {
  challenges: IChallenge[];
  loading: boolean;
  error: string;
}

export const initialState: ChallengeState = {
  challenges: [],
  loading: false,
  error: '',
};

export const challengesReducer = createReducer(
  initialState,
  on(ChallengesActions.loadChallenges, (state) => ({
    ...state,
    loading: true,
  })),
  on(ChallengesActions.loadChallengesSuccess, (state, { challenges }) => ({
    ...state,
    challenges: challenges,
    loading: false,
  })),
  on(ChallengesActions.loadChallengesFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(ChallengesActions.addChallenge, (state, { challenge }) => {
    let challenges = [...state.challenges];
    if (challenge.id) {
      challenges = [...state.challenges, challenge];
    }

    return {
      ...state,
      challenges: challenges,
      loading: false,
    };
  }),
  on(ChallengesActions.deleteChallenge, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);
