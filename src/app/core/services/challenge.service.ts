import { Injectable } from '@angular/core';
import { IChallenge } from '../models/challenge.model';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private challengeRepository: ChallengeRepository) {}

  addChallenge(challenge: IChallenge): Observable<IChallenge> {
    return this.challengeRepository
      .addChallenge(challenge)
      .pipe(tap((response) => console.log(response)));
  }

  getChallenges(): Observable<IChallenge[]> {
    return this.challengeRepository.getChallenges();
  }

  getChallenge(id: number): Observable<IChallenge> {
    return this.challengeRepository.getChallenge(id);
  }

  updateChallenge(challenge: IChallenge): Observable<IChallenge> {
    return this.challengeRepository.updateChallenge(challenge);
  }

  deleteChallenge(id: number): Observable<IChallenge[]> {
    return this.challengeRepository.deleteChallenge(id);
  }
}
