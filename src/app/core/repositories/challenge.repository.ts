import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IChallenge } from '../interfaces/challenge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeRepository {
  constructor(private dbService: NgxIndexedDBService) {}

  addChallenge(challenge: IChallenge): Observable<IChallenge> {
    return this.dbService.add<IChallenge>('challenge', challenge);
  }

  getChallenges(): Observable<IChallenge[]> {
    return this.dbService.getAll<IChallenge>('challenge');
  }

  getChallenge(id: number): Observable<IChallenge> {
    return this.dbService.getByID<IChallenge>('challenge', id);
  }

  updateChallenge(challenge: IChallenge): Observable<IChallenge> {
    return this.dbService.update<IChallenge>('challenge', { ...challenge });
  }

  deleteChallenge(id: number): Observable<IChallenge[]> {
    return this.dbService.delete<IChallenge>('challenge', id);
  }
}
