import { AppState } from '../store';

export const selectGearInfos = (state: AppState) => state.gearInfos.gearInfos;
export const selectHeadGearInfos = (state: AppState) =>
  state.gearInfos.gearInfos.filter((gearInfo) => gearInfo.gearType === 'head');
export const selectClothesGearInfos = (state: AppState) =>
  state.gearInfos.gearInfos.filter(
    (gearInfo) => gearInfo.gearType === 'clothes'
  );
export const selectShoesGearInfos = (state: AppState) =>
  state.gearInfos.gearInfos.filter((gearInfo) => gearInfo.gearType === 'shoes');
export const selectWeaponInfos = (state: AppState) =>
  state.gearInfos.weaponInfos;
export const selectLoading = (state: AppState) => state.gearInfos.loading;
export const selectError = (state: AppState) => state.gearInfos.error;
