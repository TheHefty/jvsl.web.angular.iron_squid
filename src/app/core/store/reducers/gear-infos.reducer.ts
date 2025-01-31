import { IGearInfo } from '@app/core/models/gear-info.model';
import { createReducer, on } from '@ngrx/store';
import {
  GearInfosActions,
  WeaponInfosActions,
} from '../actions/gear-info.actions';
import { IWeaponInfo } from '@app/core/models/weapon-info.model';

export interface GearInfoState {
  gearInfos: IGearInfo[];
  weaponInfos: IWeaponInfo[];
  loading: boolean;
  error: string;
}

export const initialState: GearInfoState = {
  gearInfos: [],
  weaponInfos: [],
  loading: false,
  error: '',
};

export const gearInfoReducer = createReducer(
  initialState,
  on(GearInfosActions.loadGearInfos, (state) => ({
    ...state,
    loading: true,
  })),
  on(GearInfosActions.loadGearInfosSuccess, (state, { gearInfos }) => ({
    ...state,
    gearInfos: gearInfos,
    loading: false,
  })),
  on(GearInfosActions.loadGearInfosFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(WeaponInfosActions.loadWeaponInfos, (state) => ({
    ...state,
    loading: true,
  })),
  on(WeaponInfosActions.loadWeaponInfosSuccess, (state, { weaponInfos }) => ({
    ...state,
    weaponInfos: weaponInfos,
    loading: false,
  })),
  on(WeaponInfosActions.loadWeaponInfosFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
