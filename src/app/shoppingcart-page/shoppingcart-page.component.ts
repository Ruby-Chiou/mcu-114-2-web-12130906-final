import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { JsonPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-shoppingcart-page',
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './shoppingcart-page.component.html',
  styleUrl: './shoppingcart-page.component.scss',
})
export class ShoppingcartPageComponent {
  protected readonly cartService = inject(CartService);

  //必須在這裡注入 ProductService，元件才認得 this.productService！
  private readonly productService = inject(ProductService);

  protected readonly form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
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

  protected onSubmit(): void {
    if (this.form.invalid && this.cartService.cartItems().length === 0) {
      alert('提醒您，請記得完成基本資料填寫，且您的購物車內目前沒有商品，請前往選購。');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('請填寫完整的基本資料！');
      return;
    }

    if (this.cartService.cartItems().length === 0) {
      alert('購物車目前空空如也，無法送出訂單！');
      return;
    }

    const orderPayload = {
      customerName: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      orderDetails: this.cartService.cartItems().map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
      })),
    };

    // 發送訂單
    this.productService.createOrder(orderPayload).subscribe({
      next: (response: any) => {
        alert('訂單已成功送出！謝謝您的購買。');
        this.cartService.clearCart();
        this.form.reset();
      },
      error: (err: any) => {
        console.error('訂單送出失敗：', err);
        alert('訂單送出失敗，請檢查 API 設定！');
      },
    });
  }
}
