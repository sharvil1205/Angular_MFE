import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrl: './active-orders.component.css',
  imports: [MatCard, CommonModule, MatCardContent, MatIconModule],
})
export class ActiveOrdersComponent {
  activeOrders = [
    {
      restaurantId: 1,
      orderDate: '2025-01-22T12:30:00.147',
      orderId: 700,
      totalAmount: 220,
      userId: 1,
      restaurantName: 'BURGER JOINT',
    },
    {
      restaurantId: 2,
      orderDate: '2025-01-23T14:00:00.147',
      orderId: 701,
      totalAmount: 180,
      userId: 1,
      restaurantName: 'SUSHI BAR',
    },
  ];
}
