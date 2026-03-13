import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLocal } from './products-local';

describe('ProductsLocal', () => {
  let component: ProductsLocal;
  let fixture: ComponentFixture<ProductsLocal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsLocal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsLocal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
