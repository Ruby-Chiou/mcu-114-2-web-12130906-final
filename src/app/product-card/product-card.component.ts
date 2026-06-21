import { CurrencyPipe } from '@angular/common';
import { Component, booleanAttribute, input, numberAttribute, output } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  host: { class: 'app-product-card' },
})
export class ProductCardComponent {
  readonly id = input.required<string>();

  readonly productName = input<string>();

  readonly authors = input<string[]>();

  readonly company = input<string>();

  readonly isShow = input.required<boolean, string | boolean>({ transform: booleanAttribute });

  readonly photoUrl = input<string>();

  readonly price = input<number, string | number>(0, { transform: numberAttribute });

  readonly specialPrice = input<number>();

  readonly view = output<void>();
}
