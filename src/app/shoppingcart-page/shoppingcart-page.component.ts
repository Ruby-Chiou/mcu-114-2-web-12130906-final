import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { JsonPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shoppingcart-page',
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './shoppingcart-page.component.html',
  styleUrl: './shoppingcart-page.component.scss',
})
export class ShoppingcartPageComponent {
  protected readonly cartService = inject(CartService);

  protected readonly form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }), // 修正為 string 對應 HTML text
  });

  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get address(): FormControl<string | null> {
    return this.form.get('address') as FormControl<string | null>;
  }

  get phone(): FormControl<string | null> {
    return this.form.get('phone') as FormControl<string | null>;
  }

  // ⭕ 送出訂單按鈕
  protected onSubmit(): void {
    // 檢查 1：表單欄位（姓名、地址、電話）有沒有過
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 觸發紅字
      alert('請填寫完整的基本資料！');
      return;
    }

    // 檢查 2：購物車內有沒有東西
    if (this.cartService.cartItems().length === 0) {
      alert('購物車目前空空如也，無法送出訂單！');
      return;
    }

    // 兩者皆過關
    alert('訂單已成功送出！謝謝您的購買。');
    this.cartService.clearCart(); // 清空購物車
    this.form.reset(); // 清空表單
  }
}
