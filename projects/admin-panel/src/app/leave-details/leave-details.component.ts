import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
} from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-panel-leave-details',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.css',
})
export class LeaveDetailsComponent {
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public selectedMonth: string = this.months[0];

  private leaveData = [
    {
      leaveType: 'Personal leave',
      monthlyTrend: [1, 2, 3, 4, 1, 2],
    },
    {
      leaveType: 'Sick leave',
      monthlyTrend: [2, 3, 1, 4, 2, 3],
    },
    {
      leaveType: 'Bereavement leave',
      monthlyTrend: [0, 1, 0, 1, 0, 1],
    },
    {
      leaveType: 'Comp off',
      monthlyTrend: [1, 2, 2, 1, 3, 2],
    },
  ];

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };
  public pieChartType: ChartType = 'pie';

  public pieChartLabels: string[] = this.leaveData.map(
    (leave) => leave.leaveType
  );
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  public lineChartData: ChartData<'line'> = {
    labels: this.months,
    datasets: this.leaveData.map((leave, index) => ({
      label: leave.leaveType,
      data: leave.monthlyTrend,
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ][index],
      fill: true,
    })),
  };
  public lineChartType: ChartType = 'line';

  constructor() {
    this.updatePieChart();
  }

  updatePieChart() {
    const monthIndex = this.months.indexOf(this.selectedMonth);

    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: this.leaveData.map((leave) => leave.monthlyTrend[monthIndex]),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };
  }
}
