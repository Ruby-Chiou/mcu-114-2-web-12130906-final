import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  protected readonly router = inject(Router);
  protected readonly cartService = inject(CartService);

  // ⭕ 3. 自動計算購物車內所有商品的「數量總和」
  protected readonly cartCount = computed(() => {
    return this.cartService.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });
}
