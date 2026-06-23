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
    let query = { studentId: this.studentId, pageIndex: index, pageSize: size } as {
      studentId: string;
      name?: string;
      pageIndex: number;
      pageSize: number;
    };
    if (name) query = { ...query, name };
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
}
