import { AppState } from '../store';

export const selectChallenges = (state: AppState) =>
  state.challenges.challenges;
export const selectCurrentChallenge = (state: AppState) =>
  state.challenges.currenteChallenge;
export const selectLoading = (state: AppState) => state.challenges.loading;
export const selectError = (state: AppState) => state.challenges.error;
