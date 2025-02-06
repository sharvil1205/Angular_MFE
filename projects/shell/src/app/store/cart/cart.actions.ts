import { createActionGroup, props } from '@ngrx/store';
import { IMenuItem } from '../../../../../order-food/src/app/pages/view-menu/view-menu.component';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ item: IMenuItem }>(),
    'Remove Item': props<{ itemId: number }>(),
    'Update Quantity': props<{ item: IMenuItem }>(),
    'Set Cart Visibility': props<{ isVisible: boolean }>(),
  },
});
