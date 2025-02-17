import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-panel-reusable-table',
  imports: [CommonModule],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css',
})
export class ReusableTableComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() displayedColumns: { key: string; label: string }[] = [];
}
