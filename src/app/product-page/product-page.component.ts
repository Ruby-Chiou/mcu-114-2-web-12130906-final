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

  protected readonly products = signal<Product[]>([]);
  protected readonly totalCount = signal(0);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.searchKeyword.set('');
      this.pageIndex.set(1);
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = '';
      }
    });

    effect(() => {
      this.getProductsFromServer(this.searchKeyword(), this.pageIndex(), this.pageSize());
    });
  }

  ngOnInit(): void {}

  protected onSearch(keyword: string): void {
    this.searchKeyword.set(keyword);
    this.pageIndex.set(1);
  }

  private getProductsFromServer(keyword: string, index: number, size: number): void {
    const searchName = keyword.trim() || undefined;

    this.productService.getList(searchName, index, size).subscribe(({ data, count }) => {
      this.products.set(data || []);
      this.totalCount.set(count || 0);
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
