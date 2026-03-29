import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  isLoading: boolean = false;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (result) => {
        this.cartItems = result.cartItems;
        this.totalPrice = result.total;
      },
    });
  }
  updateCartItem(item: any, change: number) {
    this.isLoading = true;
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      this.isLoading = false;
      return;
    }
    this.cartService.updateCartItem(newQuantity, item.productId).subscribe({
      next: (result) => {
        this.getCartItems();
        this.isLoading = false;
      },
    });
  }
  removeCartItem(itemId: number) {
    this.isLoading = true;

    this.cartService.removeCartItem(itemId).subscribe({
      next: (result) => {
        this.cartItems = this.cartItems.filter((item) => item.productId !== itemId);
        this.isLoading = false;
      },
    });
  }
}
