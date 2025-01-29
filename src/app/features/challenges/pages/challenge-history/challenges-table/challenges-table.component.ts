import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { IChallenge } from '@app/core/models/challenge.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/core/components/confirm-dialog/confirm-dialog.component';
import { AppState } from '@app/core/store/store';
import { Store } from '@ngrx/store';
import { ChallengesActions } from '@app/core/store/actions/challenges.actions';

@Component({
  selector: 'app-challenges-table',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
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

  constructor(private store: Store<AppState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    }
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteChallenge(id);
      }
    });
  }

  deleteChallenge(id: number): void {
    this.store.dispatch(ChallengesActions.deleteChallenge({ challengeId: id }));
  }
}
