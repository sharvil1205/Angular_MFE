import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { orderFoodRoutes } from '../../../order-food/src/app/app.routes';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(orderFoodRoutes),
    provideRouter(routes),
  ],
};
