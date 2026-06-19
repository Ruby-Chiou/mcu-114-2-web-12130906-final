import { Routes } from '@angular/router';

import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingcartPageComponent } from './shoppingcart-page/shoppingcart-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'shoppingcart', component: ShoppingcartPageComponent },
];
