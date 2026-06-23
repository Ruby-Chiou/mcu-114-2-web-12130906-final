import { Component, computed, effect, inject, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  protected readonly pageIndex = signal(1);
  protected readonly pageSize = signal(5); // 每頁顯示 5 筆
  protected readonly searchKeyword = signal('');

  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  // 儲存從 Azure API 撈回來、最原始的「大雜燴」清單
  private readonly rawProducts = signal<Product[]>([]);

  // 新增一個 computed：先做完「隱藏」與「搜尋關鍵字」過濾的乾淨總清單
  private readonly filteredProducts = computed(() => {
    const keyword = this.searchKeyword().trim().toLowerCase();

    return this.rawProducts().filter((product) => {
      // 條件 A：必須是顯示的商品
      const isVisible = product.isShow !== false;
      // 條件 B：如果有關鍵字，名稱必須符合
      const matchesKeyword = !keyword || product.name.toLowerCase().includes(keyword);

      return isVisible && matchesKeyword;
    });
  });

  // 修改 totalCount：總筆數必須跟著 filteredProducts 的長度即時連動！
  protected readonly totalCount = computed(() => this.filteredProducts().length);

  // 🚀 3. 修改 products：這才是真正要塗到畫面卡片上的「當頁切片商品」
  protected readonly products = computed(() => {
    const startIndex = (this.pageIndex() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();

    // 根據目前的頁碼（例如第 1 頁），利用 slice 切出對應位置的商品（0 到 5 筆）
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.searchKeyword.set('');
      this.pageIndex.set(1);
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = '';
      }
    });

    // 修改 effect：因為是純前端分頁與搜尋，我們只需要在初始載入時（或大重置時）撈一次「全部資料」
    // 這裡不要帶分頁參數給 getProducts 了
    effect(() => {
      this.getAllProductsFromServer();
    });
  }

  ngOnInit(): void {}

  protected onSearch(keyword: string): void {
    this.searchKeyword.set(keyword);
    this.pageIndex.set(1); // 搜尋時回到第一頁
  }

  // 修改撈取資料方法：一次性把大資料要回來
  private getAllProductsFromServer(): void {
    // 這裡傳入 1 和 999（或很大的一筆數字），強迫 Azure 一口氣把所有資料吐出來
    this.productService.getList(undefined, 1, 999).subscribe(({ data }) => {
      this.rawProducts.set(data || []);
    });
  }

  protected onAddToCart(product: any): void {
    if (product && product.id) {
      this.cartService.addToCart(product);
      alert(`已將【${product.name}】加入購物車！`);
    }
  }

  protected onView(product: Product): void {
    this.router.navigate(['product', product.id]);
  }
}
