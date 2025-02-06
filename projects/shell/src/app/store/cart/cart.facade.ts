import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from './cart.actions';
import {
  selectItems,
  selectIsVisible,
  selectTotalPrice,
} from './cart.selectors';
import { Observable } from 'rxjs';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private readonly store: Store;
  public readonly items$: Observable<IMenuItem[]>;
  public readonly isVisible$: Observable<boolean>;
  public readonly totalPrice$: Observable<number>;

  constructor(store: Store) {
    this.store = store;
    this.items$ = this.store.select(selectItems);
    this.isVisible$ = this.store.select(selectIsVisible);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  addItem(item: IMenuItem): void {
    this.store.dispatch(CartActions.addItem({ item }));
    this.showCart();
  }

  removeItem(itemId: number): void {
    this.store.dispatch(CartActions.removeItem({ itemId }));
  }

  updateItemQuantity(item: IMenuItem): void {
    this.store.dispatch(CartActions.updateQuantity({ item }));
  }

  showCart(): void {
    this.store.dispatch(CartActions.setCartVisibility({ isVisible: true }));
  }

  hideCart(): void {
    this.store.dispatch(CartActions.setCartVisibility({ isVisible: false }));
  }
}
