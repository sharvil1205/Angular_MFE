import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'order-food';
  restaurants = [
    {
      restaurantID: 1,
      name: 'KINGS BAKES',
      cuisineType: 'VEG/NONVEG',
      address: 'ODDANCHATRAM',
      contactNo: '9865041255',
      openingHours: '5AM - 12PM',
    },
    {
      restaurantID: 2,
      name: 'PIZZA WORLD',
      cuisineType: 'VEG',
      address: 'COIMBATORE',
      contactNo: '9876543210',
      openingHours: '10AM - 10PM',
    },
    {
      restaurantID: 3,
      name: 'THE BURGER HOUSE',
      cuisineType: 'NONVEG',
      address: 'CHENNAI',
      contactNo: '9856741234',
      openingHours: '11AM - 11PM',
    },
    {
      restaurantID: 4,
      name: 'SUSHI TIME',
      cuisineType: 'VEG',
      address: 'BANGALORE',
      contactNo: '9823456789',
      openingHours: '9AM - 9PM',
    },
  ];
}
