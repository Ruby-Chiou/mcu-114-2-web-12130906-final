import { TestBed } from '@angular/core/testing';

import { ProductAzureService } from './product-azure.service';

describe('ProductAzureService', () => {
  let service: ProductAzureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAzureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
