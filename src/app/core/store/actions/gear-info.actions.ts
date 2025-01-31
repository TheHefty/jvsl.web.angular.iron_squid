import { IGearInfo } from '@app/core/models/gear-info.model';
import { IWeaponInfo } from '@app/core/models/weapon-info.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GearInfosActions = createActionGroup({
  source: 'Gear Infos',
  events: {
    'Load Gear Infos': emptyProps(),
    'Load Gear Infos Success': props<{ gearInfos: IGearInfo[] }>(),
    'Load Gear Infos Failure': props<{ error: string }>(),
  },
});

export const WeaponInfosActions = createActionGroup({
  source: 'Weapon Infos',
  events: {
    'Load Weapon Infos': emptyProps(),
    'Load Weapon Infos Success': props<{ weaponInfos: IWeaponInfo[] }>(),
    'Load Weapon Infos Failure': props<{ error: string }>(),
  },
});
