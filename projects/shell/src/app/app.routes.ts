import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ActiveOrdersComponent } from './pages/home/active-orders/active-orders.component';
import { OrderHistoryComponent } from './pages/home/order-history/order-history.component';
import { AppComponent } from '../../../order-food/src/app/app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'active-orders', pathMatch: 'full' }, // Default to Active Orders
      { path: 'active-orders', component: ActiveOrdersComponent },
      { path: 'order-history', component: OrderHistoryComponent },
    ],
  },
  { path: 'order-food', component: AppComponent },

  { path: '**', redirectTo: 'home' },
];
