import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
} from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-panel-leave-details',
  imports: [BaseChartDirective],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.css',
})
export class LeaveDetailsComponent {
  leaveData = [
    { leaveType: 'Personal leave', leavesTaken: 5 },
    { leaveType: 'Sick leave', leavesTaken: 8 },
    { leaveType: 'Bereavement leave', leavesTaken: 3 },
    { leaveType: 'Comp off', leavesTaken: 6 },
  ];

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  public pieChartLabels: string[] = this.leaveData.map(
    (user) => user.leaveType
  );
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: this.leaveData.map((user) => user.leavesTaken),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
}
