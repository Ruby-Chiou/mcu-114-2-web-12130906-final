import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../model/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // 1. 購物車品項的 Signal 陣列
  readonly cartItems = signal<CartItem[]>([]);

  // 2. 全自動計算總價 (防呆：如果有特價就用特價算，沒特價用原價)
  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      const price = item.product.specialPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);
  });

  // 3. 功能：加入購物車
  addToCart(product: Product, quantity = 1) {
    const items = this.cartItems();
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      // 如果購物車已經有了，數量直接加上去
      existingItem.quantity += quantity;
      this.cartItems.set([...items]);
    } else {
      // 沒有的話，塞新的一筆進去
      this.cartItems.set([...items, { product, quantity }]);
    }
  }

  // 4. 功能：更新數量
  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const updated = this.cartItems().map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    this.cartItems.set(updated);
  }

  // 5. 功能：刪除品項
  removeFromCart(productId: string) {
    const filtered = this.cartItems().filter((item) => item.product.id !== productId);
    this.cartItems.set(filtered);
  }

  // 6. 功能：清空購物車
  clearCart() {
    this.cartItems.set([]);
  }
}
