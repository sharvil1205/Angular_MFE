import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ActiveOrdersComponent } from './pages/home/active-orders/active-orders.component';
import { OrderHistoryComponent } from './pages/home/order-history/order-history.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'active-orders', pathMatch: 'full' },
      { path: 'active-orders', component: ActiveOrdersComponent },
      { path: 'order-history', component: OrderHistoryComponent },
    ],
  },
  {
    path: 'order-food',
    loadComponent: () =>
      loadRemoteModule('order-food', './Component').then((m) => m.AppComponent),
    loadChildren: () =>
      import('../../../order-food/src/app/app.routes').then(
        (feature) => feature.orderFoodRoutes
      ),
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      loadRemoteModule('admin-panel', './Component').then(
        (m) => m.AppComponent
      ),
  },

  { path: '**', redirectTo: 'home' },
];
