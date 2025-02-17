import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from './reusable-table/reusable-table.component';

@Component({
  selector: 'app-admin-panel-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReusableTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'admin-panel';
  searchQuery: string = '';

  attendanceColumns = [
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'name', label: 'Name' },
    { key: 'present', label: 'Present' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
  ];

  payrollColumns = [
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'name', label: 'Name' },
    { key: 'salary', label: 'Salary' },
    { key: 'deductions', label: 'Deductions' },
    { key: 'netPay', label: 'Net Pay' },
  ];

  attendanceData = [
    {
      employeeId: '123',
      name: 'John Doe',
      present: true,
      timeIn: '9:00 AM',
      timeOut: '5:00 PM',
    },
    {
      employeeId: '456',
      name: 'Jane Smith',
      present: false,
      timeIn: '',
      timeOut: '',
    },
  ];

  payrollData = [
    {
      employeeId: '123',
      name: 'John Doe',
      salary: 50000,
      deductions: 5000,
      netPay: 45000,
    },
    {
      employeeId: '456',
      name: 'Jane Smith',
      salary: 60000,
      deductions: 6000,
      netPay: 54000,
    },
  ];

  filteredAttendanceData() {
    return this.attendanceData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  filteredPayrollData() {
    return this.payrollData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  userPunchIn: any = { time: '', geolocation: '' };
  userPunchOut: any = { time: '', geolocation: '' };

  punchIn() {
    this.userPunchIn.time = new Date().toLocaleTimeString();
    this.userPunchIn.geolocation = 'India';
    console.log('Punch In:', this.userPunchIn);
  }

  punchOut() {
    this.userPunchOut.time = new Date().toLocaleTimeString();
    this.userPunchOut.geolocation = 'India';
    console.log('Punch Out:', this.userPunchOut);
  }
}
