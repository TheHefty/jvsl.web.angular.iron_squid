import { ChallengeStatus } from '../enums/challenge-status.enum';
import { IChallenge } from '../models/challenge.model';

export function createEmptyChallenge(): IChallenge {
  return {
    lives: 0,
    currentGear: {
      weapon: {
        id: 0,
        name: '',
        sheldonOrder: 0,
        imageUrl: '',
        SubWeapon: '',
        SpecialWeapon: '',
        weaponCategory: '',
      },
      headGear: {
        id: 0,
        name: '',
        brand: '',
        gearType: '',
        imageUrl: '',
      },
      clothesGear: {
        id: 0,
        name: '',
        brand: '',
        gearType: '',
        imageUrl: '',
      },
      shoesGear: {
        id: 0,
        name: '',
        brand: '',
        gearType: '',
        imageUrl: '',
      },
      gameMode: undefined,
      isVictory: true,
      updateDate: new Date(),
    },
    status: ChallengeStatus.ONGOING,
    updateDate: new Date(),
    runsHistory: [],
    attemptsHistory: [],
  };
}
