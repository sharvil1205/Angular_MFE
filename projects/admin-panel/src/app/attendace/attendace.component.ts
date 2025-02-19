import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel-attendace',
  imports: [CommonModule, ReusableTableComponent, FormsModule],
  templateUrl: './attendace.component.html',
  styleUrl: './attendace.component.css',
})
export class AttendaceComponent {
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
  searchQuery: string = '';

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
