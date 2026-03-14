import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../../services/products';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: any = {};
  quantity: number = 1;
  //http://localhost:4200/products/2
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: Products,
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.getProduct(id);
    });
  }
  getProduct(id: number) {
    this.productsService.getProduct(id).subscribe({
      next: (result) => {
        console.log(result);
        this.product = result;
      },
      error: (err) => console.error('Product not found', err),
    });
  }
  addToCart() {
    this.cartService.addToCart(this.quantity, this.product.id).subscribe({
      next: (result) => {
        this.router.navigate(['/cart']);
      },
      error: (err) => console.error('Failed to add product to cart', err),
    });
  }
  back() {
    this.router.navigate(['/products']);
  }
}
