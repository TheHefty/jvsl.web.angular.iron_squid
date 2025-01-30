import { GameMode } from '../enums/game-mode.enum';
import { IGearInfo } from './gear-info.model';
import { IWeaponInfo } from './weapon-info.model';

export interface IGearSet {
  weapon: IWeaponInfo;
  headGear: IGearInfo;
  clothesGear: IGearInfo;
  shoesGear: IGearInfo;
  gameMode: GameMode | undefined;
  isVictory: boolean;
  updateDate: Date;
}
