import { Component, computed, effect, inject, signal } from '@angular/core';
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
export class ProductPageComponent {
  private router = inject(Router);

  protected readonly pageIndex = signal(1);

  protected readonly pageSize = signal(5);

  protected readonly totalCount = signal(0);

  // 宣告一個儲存查詢關鍵字的 Signal
  protected readonly searchKeyword = signal('');

  private readonly productService = inject(ProductService);

  private readonly cartService = inject(CartService);

  private readonly rawProducts = signal<Product[]>([]);

  protected readonly products = computed(() => {
    return this.rawProducts().filter((product) => product.isShow !== false);
  });

  constructor() {
    //把 searchKeyword() 加進去。這三個 Signal 任何一個改變，都會自動重撈！
    effect(() => {
      const pageIndex = this.pageIndex();
      const pageSize = this.pageSize();
      const keyword = this.searchKeyword().trim(); // 追蹤關鍵字

      this.getProducts(keyword, pageIndex, pageSize);
    });
  }

  protected onSearch(keyword: string): void {
    this.searchKeyword.set(keyword);
    this.pageIndex.set(1); // 搜尋時強迫回到第一頁，避免待在原本大頁碼導致找不到資料
  }

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

  // 把第一個參數改為接收 keyword字串，並直接傳入 service
  private getProducts(keyword: string, pageIndex: number, pageSize: number): void {
    // 把原本的 undefined 改成傳入真正的 keyword
    this.productService.getList(keyword || undefined, pageIndex, pageSize).subscribe(({ data, count }) => {
      this.rawProducts.set(data);
      this.totalCount.set(count);
    });
  }
}
