import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IGearInfo } from '../interfaces/gear-info';
import { IWeaponInfo } from '../interfaces/weapon-info';

@Injectable({
  providedIn: 'root',
})
export class GearRepository {
  private gearUrl = 'api/data';

  constructor(private http: HttpClient) {}

  getGearInfo(): Observable<IGearInfo[]> {
    return this.http
      .get<IGearInfo[]>(`${this.gearUrl}/GearInfo.json`)
      .pipe(catchError(this.handleError));
  }

  getWeaponInfo(): Observable<IWeaponInfo[]> {
    return this.http
      .get<IWeaponInfo[]>(`${this.gearUrl}/WeaponInfo.json`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
