import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMenuComponent, IMenuItem } from './view-menu.component';
import { Router } from '@angular/router';
import { CartFacade } from '../../../../../shell/src/app/store/cart/cart.facade';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ViewMenuComponent', () => {
  let component: ViewMenuComponent;
  let fixture: ComponentFixture<ViewMenuComponent>;
  let cartFacadeMock: jasmine.SpyObj<CartFacade>;
  let routerMock: jasmine.SpyObj<Router>;

  const mockRestaurant = {
    id: 1,
    name: 'Test Restaurant',
    cuisineType: 'Italian',
    address: '123 Test St',
    contactNo: '1234567890',
    openingHours: '9 AM - 10 PM',
  };

  const mockMenuItem: IMenuItem = {
    restaurantID: 1,
    price: 200,
    menuItemName: 'Coffee Mocha',
    itemID: 61,
    description: 'Rich and creamy coffee delight',
    availability: true,
    photoUrl: 'test-url',
    categoryName: 'Beverages',
    quantity: 1,
  };

  beforeEach(async () => {
    cartFacadeMock = jasmine.createSpyObj('CartFacade', ['addItem']);
    routerMock = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    routerMock.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          restaurant: mockRestaurant,
        },
      },
    } as any);

    await TestBed.configureTestingModule({
      imports: [ViewMenuComponent, MatCardModule, MatIconModule],
      providers: [
        { provide: CartFacade, useValue: cartFacadeMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurant details from router state', () => {
    expect(component.restaurant).toEqual(mockRestaurant);
  });

  it('should calculate unit price correctly', () => {
    const testItem = { ...mockMenuItem, price: 200, quantity: 2 };
    expect(component.getUnitPrice(testItem)).toBe(100);
  });

  it('should increase item quantity', () => {
    const testItem = { ...mockMenuItem };
    component.increaseQuantity(testItem);
    expect(testItem.quantity).toBe(2);
  });

  it('should decrease item quantity if greater than 1', () => {
    const testItem = { ...mockMenuItem, quantity: 2 };
    component.decreaseQuantity(testItem);
    expect(testItem.quantity).toBe(1);
  });

  it('should not decrease item quantity if equals to 1', () => {
    const testItem = { ...mockMenuItem, quantity: 1 };
    component.decreaseQuantity(testItem);
    expect(testItem.quantity).toBe(1);
  });

  it('should add item to cart when addToCart is called', () => {
    const testItem = { ...mockMenuItem };
    component.addToCart(testItem);
    expect(cartFacadeMock.addItem).toHaveBeenCalledWith(testItem);
  });

  describe('UI Elements', () => {
    it('should display restaurant name', () => {
      const titleElement = fixture.debugElement.query(By.css('h1'));
      expect(titleElement.nativeElement.textContent.trim()).toBe(
        mockRestaurant.name
      );
    });

    it('should disable decrease button when quantity is 1', () => {
      const testItem = { ...mockMenuItem, quantity: 1 };
      component.menuItems = [testItem];
      fixture.detectChanges();

      const decreaseButton = fixture.debugElement.query(
        By.css('button[mat-icon-button]')
      );
      expect(decreaseButton.nativeElement.disabled).toBeTrue();
    });

    it('should disable add to cart button when item is unavailable', () => {
      component.menuItems[0].availability = false;
      fixture.detectChanges();

      const addToCartButton = fixture.debugElement.queryAll(
        By.css('button[mat-raised-button]')
      )[0];

      expect(addToCartButton.nativeElement.disabled).toBeTrue();
    });
  });
});
