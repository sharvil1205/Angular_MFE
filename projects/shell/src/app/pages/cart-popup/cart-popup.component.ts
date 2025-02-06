import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartFacade } from '../../store/cart/cart.facade';
import { AsyncPipe } from '@angular/common';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
  imports: [MatIconModule, CommonModule, AsyncPipe],
  standalone: true,
})
export class CartPopupComponent {
  cartItems$: Observable<IMenuItem[]>;
  totalPrice$: Observable<number>;

  constructor(private cartFacade: CartFacade) {
    this.cartItems$ = this.cartFacade.items$;
    this.totalPrice$ = this.cartFacade.totalPrice$;
  }

  closeCart(): void {
    this.cartFacade.hideCart();
  }

  removeItem(item: IMenuItem): void {
    this.cartFacade.removeItem(item.itemID);
  }

  checkout(): void {
    console.log('Proceeding to checkout');
  }

  increaseQuantity(item: IMenuItem): void {
    this.cartFacade.updateItemQuantity({
      ...item,
      quantity: item.quantity + 1,
    });
  }

  decreaseQuantity(item: IMenuItem): void {
    if (item.quantity > 1) {
      this.cartFacade.updateItemQuantity({
        ...item,
        quantity: item.quantity - 1,
      });
    }
  }
}
