import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
  imports: [MatCard, CommonModule, MatCardContent, MatIconModule],
})
export class OrderHistoryComponent {
  orderHistory = [
    {
      restaurantId: 1,
      orderDate: '2025-01-19T12:04:45.147',
      orderId: 692,
      totalAmount: 200,
      userId: 1,
      restaurantName: 'KINGS BAKES',
    },
    {
      restaurantId: 2,
      orderDate: '2025-01-20T14:30:00.147',
      orderId: 693,
      totalAmount: 150,
      userId: 1,
      restaurantName: 'TACO BELLE',
    },
    {
      restaurantId: 3,
      orderDate: '2025-01-21T18:00:10.147',
      orderId: 694,
      totalAmount: 350,
      userId: 1,
      restaurantName: 'PIZZA PLACE',
    },
  ];
}
