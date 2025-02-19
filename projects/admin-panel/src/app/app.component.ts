import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { AttendaceComponent } from './attendace/attendace.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';

@Component({
  selector: 'app-admin-panel-root',
  imports: [
    CommonModule,
    MatTabsModule,
    AttendaceComponent,
    LeaveDetailsComponent,
    LeaveApplicationsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
