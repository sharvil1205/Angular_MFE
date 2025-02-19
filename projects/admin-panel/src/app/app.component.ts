import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { AttendaceComponent } from './attendace/attendace.component';

@Component({
  selector: 'app-admin-panel-root',
  imports: [
    CommonModule,
    MatTabsModule,
    AttendaceComponent,
    LeaveDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
