import { Injectable } from '@angular/core';
import { GearRepository } from '../repositories/gear.repository';
import { IGearInfo } from '../models/gear-info.model';
import { IWeaponInfo } from '../models/weapon-info.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GearService {
  constructor(private gearRepository: GearRepository) {}

  getGearInfo(): Observable<IGearInfo[]> {
    return this.gearRepository.getGearInfo();
  }

  getWeaponInfo(): Observable<IWeaponInfo[]> {
    return this.gearRepository.getWeaponInfo();
  }
}
