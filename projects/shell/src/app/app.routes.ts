import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { loadRemoteModule } from '@angular-architects/native-federation';
import { ActiveOrdersComponent } from './pages/home/active-orders/active-orders.component';
import { OrderHistoryComponent } from './pages/home/order-history/order-history.component';

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
  {
    path: 'order-food',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'orderFood',
        exposedModule: './Module',
      }).then((m) => m.OrderFoodModule),
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      loadRemoteModule('admin-panel', './Component').then(
        (m) => m.AdminPanelComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
