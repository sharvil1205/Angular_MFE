import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopupComponent } from './cart-popup.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CartPopupComponent', () => {
  let component: CartPopupComponent;
  let fixture: ComponentFixture<CartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPopupComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
