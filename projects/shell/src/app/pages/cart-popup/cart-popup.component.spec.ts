import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopupComponent } from './cart-popup.component';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';
import { CartFacade } from '../../store/cart/cart.facade';
import { of } from 'rxjs';

describe('CartPopupComponent', () => {
  let component: CartPopupComponent;
  let fixture: ComponentFixture<CartPopupComponent>;
  let cartFacadeMock: jasmine.SpyObj<CartFacade>;

  const mockCartItems: IMenuItem[] = [
    {
      itemID: 1,
      menuItemName: 'Pizza',
      price: 300,
      quantity: 2,
      photoUrl: 'pizza.jpg',
      restaurantID: 12,
      description: 'Pizza',
      availability: true,
      categoryName: 'Pizza',
    },
    {
      itemID: 2,
      menuItemName: 'Burger',
      price: 150,
      quantity: 1,
      photoUrl: 'burger.jpg',
      restaurantID: 22,
      description: 'Burger',
      availability: true,
      categoryName: 'Burger',
    },
  ];
  beforeEach(async () => {
    const facade = {
      items$: of(mockCartItems),
      totalPrice$: of(750),
      hideCart: jasmine.createSpy('hideCart'),
      removeItem: jasmine.createSpy('removeItem'),
      updateItemQuantity: jasmine.createSpy('updateItemQuantity'),
    };

    await TestBed.configureTestingModule({
      imports: [CartPopupComponent],
      providers: [
        provideMockStore({}),
        { provide: CartFacade, useValue: facade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPopupComponent);
    component = fixture.componentInstance;
    cartFacadeMock = TestBed.inject(CartFacade) as jasmine.SpyObj<CartFacade>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of cart items', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const items = fixture.debugElement.queryAll(
      By.css('[data-testid="cart-item"]')
    );
    expect(items.length).toBe(mockCartItems.length);
  });

  it('should display the correct total price', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const totalPriceElement = fixture.debugElement.query(
      By.css('[data-testid="total-price"]')
    ).nativeElement;
    expect(totalPriceElement.textContent.trim()).toBe('Total: ₹750');
  });

  it('should call closeCart when close button is clicked', () => {
    const closeButton = fixture.debugElement.query(
      By.css('[data-testid="close-button"]')
    );
    closeButton.triggerEventHandler('click', null);
    expect(cartFacadeMock.hideCart).toHaveBeenCalled();
  });

  it('should call removeItem when delete button is clicked', () => {
    const deleteButton = fixture.debugElement.query(
      By.css('[data-testid="delete-button-1"]')
    );
    deleteButton.triggerEventHandler('click', null);
    expect(cartFacadeMock.removeItem).toHaveBeenCalledWith(
      mockCartItems[0].itemID
    );
  });

  it('should call updateItemQuantity when increasing quantity', () => {
    const increaseButton = fixture.debugElement.query(
      By.css('[data-testid="increase-button-1"]')
    );
    increaseButton.triggerEventHandler('click', null);

    const updatedItem = {
      ...mockCartItems[0],
      quantity: mockCartItems[0].quantity + 1,
    };
    expect(cartFacadeMock.updateItemQuantity).toHaveBeenCalledWith(updatedItem);
  });

  it('should call updateItemQuantity when decreasing quantity', () => {
    const decreaseButton = fixture.debugElement.query(
      By.css('[data-testid="decrease-button-1"]')
    );
    decreaseButton.triggerEventHandler('click', null);

    const updatedItem = {
      ...mockCartItems[0],
      quantity: mockCartItems[0].quantity - 1,
    };
    expect(cartFacadeMock.updateItemQuantity).toHaveBeenCalledWith(updatedItem);
  });

  it('should call checkout when checkout button is clicked', () => {
    spyOn(component, 'checkout');
    const checkoutButton = fixture.debugElement.query(
      By.css('[data-testid="checkout-button"]')
    );
    checkoutButton.triggerEventHandler('click', null);
    expect(component.checkout).toHaveBeenCalled();
  });
});
