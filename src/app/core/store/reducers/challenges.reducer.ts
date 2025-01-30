import { IChallenge } from '@app/core/models/challenge.model';
import { createReducer, on } from '@ngrx/store';
import { ChallengesActions } from '../actions/challenges.actions';

export interface ChallengeState {
  currenteChallenge: IChallenge | undefined;
  challenges: IChallenge[];
  loading: boolean;
  error: string;
}

export const initialState: ChallengeState = {
  currenteChallenge: undefined,
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
  on(ChallengesActions.setChallenge, (state, { challengeId }) => {
    let current = state.challenges.find(
      (challenge) => challenge.id === challengeId
    );

    return {
      ...state,
      currenteChallenge: current,
      loading: false,
    };
  }),
  on(ChallengesActions.addChallenge, (state, { challenge }) => ({
    ...state,
    currenteChallenge: challenge,
    loading: false,
  })),
  on(ChallengesActions.updateChallenge, (state, { challenge }) => {
    return {
      ...state,
      currenteChallenge: challenge,
      loading: false,
    };
  }),
  on(ChallengesActions.deleteChallenge, (state) => ({
    ...state,
    loading: false,
  }))
);
