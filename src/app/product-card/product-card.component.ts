import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input()
  productName!: string;

  @Input()
  author!: string;

  @Input()
  company!: string;

  @Input()
  price!: string;

  @Input()
  photoUrl!: string;
}
