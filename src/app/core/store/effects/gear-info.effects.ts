import { Injectable } from '@angular/core';
import { GearService } from '@app/core/services/gear.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GearInfosActions,
  WeaponInfosActions,
} from '../actions/gear-info.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class GearInfosEffects {
  loadGearInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GearInfosActions.loadGearInfos),
      mergeMap(() =>
        this.gearService.getGearInfo().pipe(
          map((gearInfos) =>
            GearInfosActions.loadGearInfosSuccess({ gearInfos })
          ),
          catchError((error) =>
            of(GearInfosActions.loadGearInfosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadWeaponInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeaponInfosActions.loadWeaponInfos),
      mergeMap(() =>
        this.gearService.getWeaponInfo().pipe(
          map((weaponInfos) =>
            WeaponInfosActions.loadWeaponInfosSuccess({ weaponInfos })
          ),
          catchError((error) =>
            of(
              WeaponInfosActions.loadWeaponInfosFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private gearService: GearService) {}
}
