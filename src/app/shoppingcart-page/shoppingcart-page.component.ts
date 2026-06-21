import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-shoppingcart-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './shoppingcart-page.component.html',
  styleUrl: './shoppingcart-page.component.scss',
})
export class ShoppingcartPageComponent {
  readonly product = input<Product>();

  protected readonly form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<number | null>(null, { validators: [Validators.required] }),
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
}
