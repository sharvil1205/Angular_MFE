import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from './cart.service';
import { IMenuItem } from '../../../order-food/src/app/pages/view-menu/view-menu.component';
import { CartPopupComponent } from './pages/cart-popup/cart-popup.component';

@Component({
  selector: 'app-shell-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    MatIconModule,
    CartPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'shell';
  cartItems: IMenuItem[] = [];
  isCartVisible = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItemsSubject.subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.getCartPopupVisibility().subscribe((isVisible) => {
      this.isCartVisible = isVisible;
    });
  }

  openCart() {
    this.cartItems = this.cartService.getCartItems();
  }
}
