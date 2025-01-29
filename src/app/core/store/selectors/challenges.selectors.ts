import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';

export const selectChallenges = (state: AppState) =>
  state.challenges.challenges;
export const selectLoading = (state: AppState) => state.challenges.loading;
export const selectError = (state: AppState) => state.challenges.error;

export const selectChallengeById = (id: number) =>
  createSelector(selectChallenges, (challenges) =>
    challenges.find((challenge) => challenge.id === id)
  );
