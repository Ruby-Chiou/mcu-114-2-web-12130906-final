import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../model/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductAzureService extends ProductService {
  private readonly url = 'https://mcu-shopping-api.azurewebsites.net/api/product';

  private readonly studentId = '12130906';

  private readonly httpClient = inject(HttpClient);

  override getById(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    let query = {
      studentId: this.studentId,
      pageIndex: index,
      pageSize: size,
    } as any;

    if (name) query.name = name;

    query.isShow = true;

    const params = new HttpParams({ fromObject: query });

    return this.httpClient
      .get<{ items: Product[]; totalCount: number }>(this.url, { params })
      .pipe(map(({ items: data, totalCount: count }) => ({ data, count })));
  }

  /*override add(product: Readonly<Product>): Observable<Product> {
    return this.httpClient.post<Product>(this.url, { ...product, studentId: this.studentId });
  }*/

  override update(product: Readonly<Product>): Observable<Product> {
    const url = `${this.url}/${product.id}`;
    return this.httpClient.put<Product>(url, { ...product, studentId: this.studentId });
  }

  /*override remove(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.delete<Product>(url);
  }*/

  override createOrder(orderData: any): Observable<any> {
    // 建立訂單的網址（把原本產品的網址結尾 /product 換成 /order）
    const orderUrl = this.url.replace('/product', '/order');

    const payload = {
      ...orderData,
      studentId: this.studentId,
    };

    console.log('【已發送至 Azure API】', orderUrl, payload);

    // 實際發送 POST 請求
    return this.httpClient.post(orderUrl, payload);
  }
}
