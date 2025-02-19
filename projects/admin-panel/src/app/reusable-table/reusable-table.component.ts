import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
  ],
})
export class ReusableTableComponent implements AfterViewInit, OnChanges {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() displayedColumns: { key: string; label: string }[] = [];

  get columnKeys(): string[] {
    return this.displayedColumns.map((c) => c.key);
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['data'] &&
      changes['data'].currentValue !== changes['data'].previousValue
    ) {
      console.log('Data changed:', this.data);
      this.dataSource.data = [...this.data];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }
}
