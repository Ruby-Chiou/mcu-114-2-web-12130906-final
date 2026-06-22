import { Component, Input, input, output, signal } from '@angular/core';

import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../model/product';
@Component({
  selector: 'app-product-card-list',
  imports: [ProductCardComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
})
export class ProductCardListComponent {
  readonly products = input<Product[]>([]);

  readonly view = output<Product>();

  readonly pageIndex = signal(1);

  readonly addToCart = output<Product>();
}
