import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface IMenuItem {
  restaurantID: number;
  price: number;
  menuItemName: string;
  itemID: number;
  description: string;
  availability: boolean;
  photoUrl: string;
  categoryName: string;
}

@Component({
  selector: 'app-view-menu',
  imports: [CommonModule],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
})
export class ViewMenuComponent {
  restaurant: any;
  menuItems: IMenuItem[] = [
    {
      restaurantID: 1,
      price: 200,
      menuItemName: 'Coffee Mocha',
      itemID: 61,
      description: 'Rich and creamy coffee delight',
      availability: true,
      photoUrl: 'https://via.placeholder.com/150',
      categoryName: 'Beverages',
    },
    {
      restaurantID: 1,
      price: 400,
      menuItemName: 'Veg Pizza',
      itemID: 62,
      description: 'Delicious veggie-loaded pizza',
      availability: true,
      photoUrl: 'https://via.placeholder.com/150',
      categoryName: 'Pizza',
    },
    {
      restaurantID: 1,
      price: 450,
      menuItemName: 'Chicken Burger',
      itemID: 63,
      description: 'Crispy chicken with fresh veggies',
      availability: true,
      photoUrl: 'https://via.placeholder.com/150',
      categoryName: 'Burgers',
    },
  ];
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.restaurant = navigation?.extras.state?.['restaurant'] || null;
  }
}
