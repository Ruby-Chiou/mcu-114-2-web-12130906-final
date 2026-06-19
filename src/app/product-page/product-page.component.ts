import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  products: Product[] = [
    new Product({
      id: 1,
      name: 'A 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 2,
      name: 'B 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 3,
      name: 'C 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 4,
      name: 'D 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 5,
      name: 'E 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 6,
      name: 'F 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: 7,
      name: 'G 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
  ];
}
