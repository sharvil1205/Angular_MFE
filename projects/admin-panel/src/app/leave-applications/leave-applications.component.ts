import { CommonModule } from '@angular/common';
import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface LeaveApplication {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

@Component({
  selector: 'app-admin-panel-leave-applications',
  templateUrl: './leave-applications.component.html',
  styleUrl: './leave-applications.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class LeaveApplicationsComponent {
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;

  leaveApplications = new MatTableDataSource<LeaveApplication>([
    {
      id: 1,
      employeeName: 'John Doe',
      leaveType: 'Sick Leave',
      startDate: '2025-02-20',
      endDate: '2025-02-22',
      status: 'Pending',
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      leaveType: 'Personal Leave',
      startDate: '2025-02-25',
      endDate: '2025-02-28',
      status: 'Pending',
    },
  ]);

  displayedColumns: string[] = [
    'employeeName',
    'leaveType',
    'dateRange',
    'status',
    'reason',
    'actions',
  ];

  dialogData: { action: 'approve' | 'reject' } = { action: 'approve' };
  dialogReason: string = '';
  private dialogRef: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(id: number, action: 'approve' | 'reject') {
    this.dialogData = { action };
    this.dialogReason = '';

    this.dialogRef = this.dialog.open(this.confirmationDialog, {
      width: '400px',
      data: this.dialogData,
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'approve') {
          this.approveLeave(id, this.dialogReason);
        } else {
          this.rejectLeave(id, this.dialogReason);
        }
      }
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  confirmDialog() {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  approveLeave(id: number, reason: string) {
    this.leaveApplications.data = this.leaveApplications.data.map((leave) =>
      leave.id === id ? { ...leave, status: 'Approved', reason } : leave
    );
  }

  rejectLeave(id: number, reason: string) {
    this.leaveApplications.data = this.leaveApplications.data.map((leave) =>
      leave.id === id ? { ...leave, status: 'Rejected', reason } : leave
    );
  }
}
