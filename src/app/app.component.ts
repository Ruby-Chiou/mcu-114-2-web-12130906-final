import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected productName = 'A 書籍';
  protected author = '作者 A、作者 B、作者 C';
  protected company = '博碩文化';
  protected price = '$1,580.00';

  protected photoUrl = 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img';
}
