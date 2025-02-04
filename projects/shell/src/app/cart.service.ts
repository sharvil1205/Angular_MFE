import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  private cartPopupVisibleSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  getCartItems() {
    return this.cartItemsSubject.value;
  }

  addItemToCart(item: any) {
    const existingItem = this.cartItems.find((i) => i.itemID === item.itemID);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.cartItemsSubject.next([...this.cartItems]);
    this.showCartPopup();
  }

  removeItemFromCart(item: any) {
    this.cartItems = this.cartItems.filter((i) => i.itemID !== item.itemID);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateItemQuantity(updatedItem: any) {
    const index = this.cartItems.findIndex(
      (item) => item.itemID === updatedItem.itemID
    );
    if (index !== -1) {
      this.cartItems[index] = { ...updatedItem };
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  showCartPopup() {
    this.cartPopupVisibleSubject.next(true);
  }

  hideCartPopup() {
    this.cartPopupVisibleSubject.next(false);
  }

  getCartPopupVisibility() {
    return this.cartPopupVisibleSubject.asObservable();
  }

  closeCartPopup() {
    this.hideCartPopup();
  }
}
