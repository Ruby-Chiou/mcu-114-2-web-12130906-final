import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private router = inject(Router);

  protected readonly pageIndex = signal(1);

  protected readonly pageSize = signal(5);

  protected readonly totalCount = signal(0);

  private readonly productService = inject(ProductService);

  private readonly cartService = inject(CartService);

  private readonly rawProducts = signal<Product[]>([]);

  protected readonly products = computed(() => {
    return this.rawProducts().filter((product) => product.isShow !== false);
  });

  constructor() {
    effect(() => {
      const pageIndex = this.pageIndex();
      const pageSize = this.pageSize();
      this.getProducts(pageIndex, pageSize);
    });
  }

  ngOnInit(): void {}

  protected onAddToCart(product: any): void {
    console.log('【首頁元件】成功收到加入購物車訊號！收到的商品資料為：', product);
    if (product && product.id) {
      this.cartService.addToCart(product);
      alert(`已將【${product.name}】加入購物車！`);
    } else {
      console.error('接收到的產品資料不完整：', product);
    }
  }

  protected onView(product: Product): void {
    this.router.navigate(['product', product.id]);
  }

  private getProducts(pageIndex: number, pageSize: number): void {
    this.productService.getList(undefined, pageIndex, pageSize).subscribe(({ data, count }) => {
      this.rawProducts.set(data);
      this.totalCount.set(count);
    });
  }
}
