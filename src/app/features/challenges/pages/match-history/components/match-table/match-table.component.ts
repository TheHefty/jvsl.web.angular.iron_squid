import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IChallenge } from '@app/core/models/challenge.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { IGearSet } from '@app/core/models/gear-set.model';

@Component({
  selector: 'app-match-table',
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './match-table.component.html',
  styleUrl: './match-table.component.scss',
})
export class MatchTableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = ['weapon', 'gameMode', 'updateDate'];

  dataSource = new MatTableDataSource<IGearSet>([]);

  @Input() currentChallenge!: IChallenge;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChallenge']) {
      this.dataSource.data = this.currentChallenge.attemptsHistory;
      this.dataSource.paginator = this.paginator;
    }
  }
}
