import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartFacade } from './store/cart/cart.facade';
import { CartPopupComponent } from './pages/cart-popup/cart-popup.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IMenuItem } from '../../../order-food/src/app/pages/view-menu/view-menu.component';

@Component({
  selector: 'app-shell-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    MatIconModule,
    CartPopupComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  cartItems$: Observable<IMenuItem[]>;
  isCartVisible$: Observable<boolean>;

  constructor(private cartFacade: CartFacade) {
    this.cartItems$ = this.cartFacade.items$;
    this.isCartVisible$ = this.cartFacade.isVisible$;
  }

  title = 'shell';

  openCart(): void {
    this.cartFacade.showCart();
  }
}
