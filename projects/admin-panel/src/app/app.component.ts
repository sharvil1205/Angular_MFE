import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'admin-panel';

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

  displayedColumns: string[] = [
    'employeeId',
    'name',
    'present',
    'timeIn',
    'timeOut',
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

  payrollDisplayedColumns: string[] = [
    'employeeId',
    'name',
    'salary',
    'deductions',
    'netPay',
  ];

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
