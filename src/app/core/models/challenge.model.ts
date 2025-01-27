import { ChallengeStatus } from '../enums/challenge-status.enum';
import { IGearSet } from './gear-set.model';

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
