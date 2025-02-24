import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
import { FormsModule } from '@angular/forms';

interface Holiday {
  name: string;
  date: string;
  type: string;
}

interface MonthOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-admin-panel-holidays',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReusableTableComponent,
    FormsModule,
  ],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent implements OnInit {
  selectedView: 'table' | 'calendar' = 'table';
  selectedMonth: number = new Date().getMonth();
  filteredHolidays: Holiday[] = [];

  months: MonthOption[] = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  holidays: Holiday[] = [
    {
      name: "New Year's Day",
      date: '2025-01-01',
      type: 'Public Holiday',
    },
    {
      name: 'Republic Day',
      date: '2025-01-26',
      type: 'National Holiday',
    },
    {
      name: 'Holi',
      date: '2025-03-14',
      type: 'Festival',
    },
    {
      name: 'Good Friday',
      date: '2025-04-18',
      type: 'Religious Holiday',
    },
    {
      name: 'Independence Day',
      date: '2025-08-15',
      type: 'National Holiday',
    },
    {
      name: 'Diwali',
      date: '2025-11-12',
      type: 'Festival',
    },
    {
      name: 'Christmas',
      date: '2025-12-25',
      type: 'Public Holiday',
    },
  ];

  displayedColumns = [
    { key: 'name', label: 'Holiday Name' },
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
  ];

  ngOnInit() {
    this.filterHolidays();
  }

  filterHolidays() {
    this.filteredHolidays = this.holidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getMonth() === this.selectedMonth;
    });
  }

  onMonthChange() {
    this.filterHolidays();
  }
}
