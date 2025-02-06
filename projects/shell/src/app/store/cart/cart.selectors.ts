import { createFeature, createSelector } from '@ngrx/store';
import { cartReducer, CartState } from './cart.reducer';

export const cartFeature = createFeature({
  name: 'cart',
  reducer: cartReducer,
  extraSelectors: ({ selectCartState }) => ({
    selectItems: createSelector(
      selectCartState,
      (state: CartState) => state.items
    ),
    selectIsVisible: createSelector(
      selectCartState,
      (state: CartState) => state.isVisible
    ),
    selectTotalPrice: createSelector(selectCartState, (state: CartState) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    ),
  }),
});

export const {
  selectCartState,
  selectItems,
  selectIsVisible,
  selectTotalPrice,
} = cartFeature;
