import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';

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
