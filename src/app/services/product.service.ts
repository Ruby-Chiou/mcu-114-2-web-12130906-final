import { Injectable } from '@angular/core';
import { Observable, delay, filter, map, mergeMap, of, tap, toArray } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _data: Product[] = [
    new Product({
      id: '1',
      name: 'A 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      specialPrice: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '2',
      name: 'B 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '3',
      name: 'C 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '4',
      name: 'D 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '5',
      name: 'E 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '6',
      name: 'F 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
    new Product({
      id: '7',
      name: 'G 產品',
      authors: ['作者 A、作者 B、作者 C'],
      company: '博碩文化',
      price: 1580,
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    }),
  ];

  getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    return of(this._data).pipe(
      mergeMap((data) => data),
      filter((item) => (name ? item.name === name : true)),
      toArray(),
      map((data) => {
        const startIndex = (index - 1) * size;
        const endIndex = startIndex + size;
        return { data: data.slice(startIndex, endIndex), count: data.length };
      })
    );
  }

  getById(productId: string): Observable<Product> {
    return of(this._data).pipe(
      mergeMap((data) => data),
      filter(({ id }) => id === productId)
    );
  }

  update(product: Readonly<Product>): Observable<Product> {
    throw new Error('Not implement');
  }

  // 🚀 補在本地的 ProductService 最下方，當作抽象或虛擬基地
  createOrder(orderData: any): Observable<any> {
    // 本地預設直接回傳一個空的 Observable，子類別 (Azure) 會去 override 它
    return of({ success: true });
  }
}
