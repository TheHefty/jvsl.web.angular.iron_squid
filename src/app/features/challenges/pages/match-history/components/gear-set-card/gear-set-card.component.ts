import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChallengeStatus } from '@app/core/enums/challenge-status.enum';
import { IChallenge } from '@app/core/models/challenge.model';
import { ChallengeService } from '@app/core/services/challenge.service';
import { ChallengesActions } from '@app/core/store/actions/challenges.actions';
import {
  selectClothesGearInfos,
  selectHeadGearInfos,
  selectShoesGearInfos,
  selectWeaponInfos,
} from '@app/core/store/selectors/gear-info.selectors';
import { AppState } from '@app/core/store/store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-gear-set-card',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './gear-set-card.component.html',
  styleUrl: './gear-set-card.component.scss',
})
export class GearSetCardComponent implements OnChanges {
  [x: string]: any;
  private _snackBar = inject(MatSnackBar);

  gearRerollFuncs = [
    (): void => {
      this.store.select(selectWeaponInfos).subscribe((weaponInfos) => {
        let usedWeapons = this.challenge.attemptsHistory.map((c) => {
          return c.weapon;
        });

        weaponInfos = weaponInfos.filter(
          (w) => !usedWeapons.some((uw) => uw.id === w.id)
        );

        const randomIndex = Math.floor(Math.random() * weaponInfos.length);

        this.challenge.currentGear.weapon = weaponInfos[randomIndex];
      });
    },
    (): void => {
      this.store.select(selectHeadGearInfos).subscribe((gearInfos) => {
        let usedGear = this.challenge.attemptsHistory.map((c) => {
          return c.headGear;
        });

        gearInfos = gearInfos.filter(
          (g) => !usedGear.some((ug) => ug.id === g.id)
        );

        const randomIndex = Math.floor(Math.random() * gearInfos.length);

        this.challenge.currentGear.headGear = gearInfos[randomIndex];
      });
    },
    (): void => {
      this.store.select(selectClothesGearInfos).subscribe((gearInfos) => {
        let usedGear = this.challenge.attemptsHistory.map((c) => {
          return c.clothesGear;
        });

        gearInfos = gearInfos.filter(
          (g) => !usedGear.some((ug) => ug.id === g.id)
        );

        const randomIndex = Math.floor(Math.random() * gearInfos.length);

        this.challenge.currentGear.clothesGear = gearInfos[randomIndex];
      });
    },
    (): void => {
      this.store.select(selectShoesGearInfos).subscribe((gearInfos) => {
        let usedGear = this.challenge.attemptsHistory.map((c) => {
          return c.shoesGear;
        });

        gearInfos = gearInfos.filter(
          (g) => !usedGear.some((ug) => ug.id === g.id)
        );

        const randomIndex = Math.floor(Math.random() * gearInfos.length);

        this.challenge.currentGear.shoesGear = gearInfos[randomIndex];
      });
    },
  ];

  @Input() currentChallenge!: IChallenge;

  challenge!: IChallenge;

  constructor(
    private store: Store<AppState>,
    private challengeService: ChallengeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChallenge']) {
      this.challenge = structuredClone(this.currentChallenge);

      if (this.challenge.currentGear.headGear.id === 0) {
        this.victoryEvent();
      }
    }
  }

  defeatEvent() {
    if (!this.challenge.currentGear.gameMode) {
      this._snackBar.open('Choose a game mode', 'close');
      return;
    }

    this.challenge.lives = this.challenge.lives - 1;

    if (this.challenge.lives === 0) {
      this.challenge.currentGear.isVictory = false;
      this.challenge.attemptsHistory.unshift({ ...this.challenge.currentGear });
      this.challenge.runsHistory?.unshift({
        updateDate: new Date(),
        attemptsHistory: this.challenge.attemptsHistory,
      });
      this.challenge.attemptsHistory = [];
      this.challenge.lives = 1;
      for (let i = 0; i < this.gearRerollFuncs.length; i++) {
        this.gearRerollFuncs[i]();
      }
    }

    this.challenge.updateDate = new Date();
    this.challenge.currentGear.updateDate = new Date();

    this.updateChallenge();
  }

  victoryEvent() {
    if (this.challenge.currentGear.headGear.id !== 0) {
      if (!this.challenge.currentGear.gameMode) {
        this._snackBar.open('Choose a game mode', 'close');
        return;
      }
      this.challenge.currentGear.isVictory = true;
      this.challenge.attemptsHistory.unshift({ ...this.challenge.currentGear });
    }

    if (this.challenge.attemptsHistory.length === 129) {
      this.challenge.status = ChallengeStatus.COMPLETED;
    } else {
      for (let i = 0; i < this.gearRerollFuncs.length; i++) {
        this.gearRerollFuncs[i]();
      }

      this.challenge.lives =
        this.challenge.attemptsHistory.length % 10 === 0
          ? this.challenge.lives + 1
          : this.challenge.lives;
    }

    this.challenge.updateDate = new Date();
    this.challenge.currentGear.updateDate = new Date();

    this.updateChallenge();
  }

  rerollGear(index: number) {
    this.gearRerollFuncs[index]();
    this.challenge.currentGear.updateDate = new Date();
    this.updateChallenge();
  }

  updateChallenge() {
    this.challengeService
      .updateChallenge(this.challenge)
      .subscribe((challenge) =>
        this.store.dispatch(ChallengesActions.updateChallenge({ challenge }))
      );
  }
}
