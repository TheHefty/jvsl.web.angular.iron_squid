import { IChallenge } from '@app/core/models/challenge.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ChallengesActions = createActionGroup({
  source: 'Challenges',
  events: {
    'Load Challenges': emptyProps(),
    'Load Challenges Success': props<{ challenges: IChallenge[] }>(),
    'Load Challenges Failure': props<{ error: string }>(),
    'Add Challenge': props<{ challenge: IChallenge }>(),
    'Set Challenge': props<{ challengeId: number }>(),
    'Update Challenge': props<{ challenge: IChallenge }>(),
    'Delete Challenge': props<{ challengeId: number }>(),
  },
});
