import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../../shell/src/app/cart.service';
import { CartFacade } from '../../../../../shell/src/app/store/cart/cart.facade';

export interface IMenuItem {
  restaurantID: number;
  price: number;
  menuItemName: string;
  itemID: number;
  description: string;
  availability: boolean;
  photoUrl: string;
  categoryName: string;
  quantity: number;
}

@Component({
  selector: 'app-view-menu',
  imports: [
    MatCardContent,
    MatCard,
    MatIcon,
    MatCardActions,
    MatChipsModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss'],
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
      photoUrl:
        'https://th.bing.com/th/id/OIP.NIGztMbdYyH2mmXHUiw6QgHaE8?w=291&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      categoryName: 'Beverages',
      quantity: 1,
    },
    {
      restaurantID: 1,
      price: 400,
      menuItemName: 'Veg Pizza',
      itemID: 62,
      description: 'Delicious veggie-loaded pizza',
      availability: true,
      photoUrl:
        'https://th.bing.com/th/id/OIP.fZzw-XCDCP9ptC8rmNnX9wHaE8?w=241&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      categoryName: 'Pizza',
      quantity: 1,
    },
    {
      restaurantID: 1,
      price: 450,
      menuItemName: 'Chicken Burger',
      itemID: 63,
      description: 'Crispy chicken with fresh veggies',
      availability: true,
      photoUrl: 'https://wallpaperaccess.com/full/1306253.jpg',
      categoryName: 'Burgers',
      quantity: 1,
    },
  ];

  constructor(private router: Router, private cartFacade: CartFacade) {
    const navigation = this.router.getCurrentNavigation();
    this.restaurant = navigation?.extras.state?.['restaurant'] || null;
  }

  getUnitPrice(item: IMenuItem): number {
    return item.price / item.quantity;
  }

  increaseQuantity(item: IMenuItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: IMenuItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  addToCart(item: IMenuItem): void {
    this.cartFacade.addItem({ ...item });
  }
}
