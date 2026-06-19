import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartPageComponent } from './shoppingcart-page.component';

describe('ShoppingcartPageComponent', () => {
  let component: ShoppingcartPageComponent;
  let fixture: ComponentFixture<ShoppingcartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingcartPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingcartPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
