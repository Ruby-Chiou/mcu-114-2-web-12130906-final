import { Routes } from '@angular/router';

import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingcartPageComponent } from './shoppingcart-page/shoppingcart-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { productResolver } from './resolver/product.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'shoppingcart', component: ShoppingcartPageComponent },
];
