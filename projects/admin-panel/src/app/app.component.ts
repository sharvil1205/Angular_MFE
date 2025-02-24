import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { AttendaceComponent } from './attendace/attendace.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';
import { HolidaysComponent } from './holidays/holidays.component';

@Component({
  selector: 'app-admin-panel-root',
  imports: [
    CommonModule,
    MatTabsModule,
    AttendaceComponent,
    LeaveDetailsComponent,
    LeaveApplicationsComponent,
    HolidaysComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
