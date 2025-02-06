import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';

export interface CartState {
  items: IMenuItem[];
  isVisible: boolean;
}

export const initialState: CartState = {
  items: [],
  isVisible: false,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { item }) => {
    const existingItem = state.items.find((i) => i.itemID === item.itemID);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((i) =>
          i.itemID === item.itemID
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { ...item }],
    };
  }),
  on(CartActions.removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.itemID !== itemId),
  })),
  on(CartActions.updateQuantity, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.itemID === item.itemID ? { ...item } : i)),
  })),
  on(CartActions.setCartVisibility, (state, { isVisible }) => ({
    ...state,
    isVisible,
  }))
);
