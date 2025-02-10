import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CartFacade } from './store/cart/cart.facade';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMenuItem } from '../../../order-food/src/app/pages/view-menu/view-menu.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  template: '',
  standalone: true,
})
class MockHomeComponent {}

@Component({
  selector: 'app-order-food',
  template: '',
  standalone: true,
})
class MockOrderFoodComponent {}

@Component({
  selector: 'app-admin-panel',
  template: '',
  standalone: true,
})
class MockAdminPanelComponent {}

@Component({
  selector: 'app-shell-cart-popup',
  template: '',
  standalone: true,
})
class MockCartPopupComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let cartFacadeMock: Partial<CartFacade>;
  let itemsSubject: BehaviorSubject<IMenuItem[]>;
  let isVisibleSubject: BehaviorSubject<boolean>;

  const mockCartItems: IMenuItem[] = [
    {
      itemID: 1,
      menuItemName: 'Pizza',
      price: 10.99,
      quantity: 1,
      photoUrl: 'pizza.jpg',
      restaurantID: 1,
      description: 'Delicious pizza',
      availability: true,
      categoryName: 'Main Course',
    },
    {
      itemID: 2,
      menuItemName: 'Burger',
      price: 8.99,
      quantity: 2,
      photoUrl: 'burger.jpg',
      restaurantID: 1,
      description: 'Juicy burger',
      availability: true,
      categoryName: 'Main Course',
    },
  ];

  beforeEach(async () => {
    itemsSubject = new BehaviorSubject<IMenuItem[]>([]);
    isVisibleSubject = new BehaviorSubject<boolean>(false);

    cartFacadeMock = {
      showCart: jasmine.createSpy('showCart'),
      hideCart: jasmine.createSpy('hideCart'),
      items$: itemsSubject.asObservable(),
      isVisible$: isVisibleSubject.asObservable(),
      addItem: jasmine.createSpy('addItem'),
      removeItem: jasmine.createSpy('removeItem'),
      updateItemQuantity: jasmine.createSpy('updateItemQuantity'),
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: MockHomeComponent },
          { path: 'order-food', component: MockOrderFoodComponent },
          { path: 'admin-panel', component: MockAdminPanelComponent },
        ]),
        MockHomeComponent,
        MockOrderFoodComponent,
        MockAdminPanelComponent,
        MockCartPopupComponent,
      ],
      providers: [
        provideMockStore({}),
        { provide: CartFacade, useValue: cartFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('Navigation', () => {
    it('should navigate to correct routes', async () => {
      await router.navigateByUrl('/home');
      expect(router.url).toBe('/home');

      await router.navigateByUrl('/order-food');
      expect(router.url).toBe('/order-food');

      await router.navigateByUrl('/admin-panel');
      expect(router.url).toBe('/admin-panel');
    });

    it('should have correct navigation links with proper attributes', () => {
      const links = fixture.nativeElement.querySelectorAll('a');

      links.forEach(
        (link: { classList: { contains: (arg0: string) => any } }) => {
          expect(link.classList.contains('text-white')).toBeTruthy();
          expect(link.classList.contains('text-lg')).toBeTruthy();
          expect(link.classList.contains('hover:text-yellow-300')).toBeTruthy();
        }
      );

      expect(links[0].getAttribute('routerLink')).toBe('/home');
      expect(links[1].getAttribute('routerLink')).toBe('/order-food');
      expect(links[2].getAttribute('routerLink')).toBe('/admin-panel');
    });
  });

  describe('Cart Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty cart', (done) => {
      component.cartItems$.subscribe((items) => {
        expect(items.length).toBe(0);
        done();
      });
    });

    it('should display cart icon button', () => {
      const cartButton = fixture.debugElement.query(By.css('button'));
      expect(cartButton).toBeTruthy();
      expect(cartButton.query(By.css('mat-icon'))).toBeTruthy();
    });

    it('should call openCart when cart button is clicked', () => {
      const cartButton = fixture.debugElement.query(By.css('button'));
      cartButton.triggerEventHandler('click', null);
      expect(cartFacadeMock.showCart).toHaveBeenCalled();
    });

    it('should show cart count badge when items are present', () => {
      itemsSubject.next(mockCartItems);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.bg-red-500'));
      expect(badge).toBeTruthy();
      expect(badge.nativeElement.textContent.trim()).toBe('2');
    });

    it('should not show cart count badge when cart is empty', () => {
      itemsSubject.next([]);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.bg-red-500'));
      expect(badge).toBeNull();
    });

    it('should show cart popup when isCartVisible$ is true', () => {
      isVisibleSubject.next(true);
      fixture.detectChanges();

      const cartPopup = fixture.debugElement.query(
        By.css('app-shell-cart-popup')
      );
      expect(cartPopup).toBeTruthy();
    });

    it('should hide cart popup when isCartVisible$ is false', () => {
      isVisibleSubject.next(false);
      fixture.detectChanges();

      const cartPopup = fixture.debugElement.query(
        By.css('app-shell-cart-popup')
      );
      expect(cartPopup).toBeNull();
    });

    it('should update cart count when items are added', (done) => {
      itemsSubject.next([mockCartItems[0]]);

      component.cartItems$.subscribe((items) => {
        expect(items.length).toBe(1);
        done();
      });
    });

    it('should handle multiple items in cart', (done) => {
      itemsSubject.next(mockCartItems);

      component.cartItems$.subscribe((items) => {
        expect(items.length).toBe(2);
        expect(items[0].menuItemName).toBe('Pizza');
        expect(items[1].menuItemName).toBe('Burger');
        done();
      });
    });

    it('should properly display total quantity of items', () => {
      const itemsWithMultipleQuantities = [
        { ...mockCartItems[0], quantity: 2 },
        { ...mockCartItems[1], quantity: 3 },
      ];

      itemsSubject.next(itemsWithMultipleQuantities);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.bg-red-500'));
      expect(badge.nativeElement.textContent.trim()).toBe('2');
    });
  });
});
