import { ChallengeStatus } from '../enums/challenge-status';
import { IGearSet } from './gear-set';

export interface IChallenge {
  id?: number;
  lives: number;
  currentGear: IGearSet;
  status: ChallengeStatus;
  attemptsHistory: IGearSet[];
  runsHistory: {
    attemptsHistory: IGearSet[];
    updateDate: Date;
  }[];
  updateDate: Date;
}
