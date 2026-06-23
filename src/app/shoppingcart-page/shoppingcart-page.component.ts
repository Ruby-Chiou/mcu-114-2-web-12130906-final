import { Component, inject, OnInit } from '@angular/core';
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
export class ShoppingcartPageComponent implements OnInit {
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

  ngOnInit(): void {
    const savedDraft = localStorage.getItem('checkout_form_draft');
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      // 把上次填到一半的資料塞回表單裡
      this.form.patchValue(draftData);
    }

    this.form.valueChanges.subscribe((value) => {
      localStorage.setItem(
        'checkout_form_draft',
        JSON.stringify({
          name: value.name,
          address: value.address,
          phone: value.phone,
        })
      );
    });
  }

  private invalidSubmitCount = 0;

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.invalidSubmitCount++; // 失敗次數 +1

      // 點到第 2 次以上時，給他一個更直白的警告
      if (this.invalidSubmitCount >= 2) {
        alert(`提醒您：欄位尚未填寫完畢，請檢查紅字提示位置。`);
      }
      return;
    }

    this.invalidSubmitCount = 0;

    const orderPayload = {
      customerName: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      orderDetails: this.cartService.cartItems().map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    // 發送訂單到 Azure API
    this.productService.createOrder(orderPayload).subscribe({
      next: (response: any) => {
        alert('訂單已成功送出！謝謝您的購買。');

        localStorage.removeItem('checkout_form_draft');

        this.cartService.clearCart(); // 清空購買項目
        this.form.reset(); // 清空表單且紅字會全自動隱藏
      },
      error: (err: any) => {
        console.error('訂單送出失敗：', err);
        alert('訂單送出失敗，請檢查 API 設定！');
      },
    });
  }
}
