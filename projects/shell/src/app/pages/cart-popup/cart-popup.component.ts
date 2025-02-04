import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shell-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
  imports: [MatIconModule, CommonModule],
})
export class CartPopupComponent implements OnInit {
  cartItems: IMenuItem[] = [];
  totalPrice = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsSubject.subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotal();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  closeCart() {
    this.cartService.closeCartPopup();
  }

  removeItem(item: any) {
    this.cartService.removeItemFromCart(item);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  checkout() {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
  }

  increaseQuantity(item: IMenuItem) {
    item.quantity++;
    this.calculateTotal();
    this.cartService.updateItemQuantity(item);
  }

  decreaseQuantity(item: IMenuItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
      this.cartService.updateItemQuantity(item);
    }
  }
}
