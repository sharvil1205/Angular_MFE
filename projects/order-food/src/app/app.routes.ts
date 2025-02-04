import { Routes } from '@angular/router';
import { ViewMenuComponent } from './pages/view-menu/view-menu.component';

export const orderFoodRoutes: Routes = [
  {
    path: '',
    children: [{ path: 'restaurant', component: ViewMenuComponent }],
  },
];
