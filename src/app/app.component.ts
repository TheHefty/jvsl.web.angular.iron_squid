import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { ChallengesActions } from './core/store/actions/challenges.actions';
import { AppState } from './core/store/store';
import {
  GearInfosActions,
  WeaponInfosActions,
} from './core/store/actions/gear-info.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Iron Squid Challenge';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ChallengesActions.loadChallenges());
    this.store.dispatch(GearInfosActions.loadGearInfos());
    this.store.dispatch(WeaponInfosActions.loadWeaponInfos());
  }
}
