import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/core/components/confirm-dialog/confirm-dialog.component';
import { IChallenge } from '@app/core/models/challenge.model';
import { ChallengesActions } from '@app/core/store/actions/challenges.actions';
import { AppState } from '@app/core/store/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-challenges-table',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './challenges-table.component.html',
  styleUrl: './challenges-table.component.scss',
})
export class ChallengesTableComponent implements OnChanges {
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<IChallenge>([]);
  displayedColumns: string[] = [
    'continue',
    'id',
    'attempts',
    'status',
    'updateDate',
    'options',
  ];

  @Input() data: IChallenge[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    }
  }

  generateCSVFile(challenge: IChallenge) {
    let csvData = '';

    csvData +=
      'Weapon; Head Gear; Cloth Gear; Shoes Gear; Game Mode; Victory; Last Update\n';

    challenge.attemptsHistory.forEach((attempt) => {
      csvData += `${attempt.weapon.name};${attempt.headGear.name};${
        attempt.clothesGear.name
      };${attempt.shoesGear.name};${attempt.gameMode};${
        attempt.isVictory ? 'yes' : 'no'
      };${attempt.updateDate.toLocaleDateString()}\n`;
    });
    challenge.runsHistory.forEach((run) => {
      run.attemptsHistory.forEach((attempt) => {
        csvData += `${attempt.weapon.name};${attempt.headGear.name};${
          attempt.clothesGear.name
        };${attempt.shoesGear.name};${attempt.gameMode};${
          attempt.isVictory ? 'yes' : 'no'
        };${attempt.updateDate.toLocaleDateString()}\n`;
      });
    });

    let blob = new Blob([csvData], { type: 'text/csv' });

    return window.URL.createObjectURL(blob);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteChallenge(id);
      }
    });
  }

  selectChallenge(id: number): void {
    this.store.dispatch(ChallengesActions.setChallenge({ challengeId: id }));
    this.router.navigate(['challenges/current']);
  }

  deleteChallenge(id: number): void {
    this.store.dispatch(ChallengesActions.deleteChallenge({ challengeId: id }));
  }
}
