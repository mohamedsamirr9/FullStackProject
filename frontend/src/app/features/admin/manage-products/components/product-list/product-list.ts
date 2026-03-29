import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductsService } from '../../services/admin-products-service';
import { CategoriesService } from '../../../../products/services/categories-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: any[] = [];
  pagedProducts: any[] = [];
  categories: any[] = [];
  
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  isLoading = false;
  errorMessage = '';

  constructor(
    private adminProductsService: AdminProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategoriesAndProducts();
  }

  loadCategoriesAndProducts() {
    this.isLoading = true;
    this.errorMessage = '';

    // Load categories first to map CategoryId to Category Name
    this.categoriesService.getCategories().subscribe({
      next: (categoriesData) => {
        this.categories = categoriesData;
        this.loadProducts();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories.';
        this.isLoading = false;
        console.error('Error loading categories:', err);
      }
    });
  }

  loadProducts() {
    this.adminProductsService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.pageSize) || 1;
        this.updatePagedProducts();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      },
    });
  }

  updatePagedProducts() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagedProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagedProducts();
    }
  }

  addProduct() {
    this.router.navigate(['/admin/products/add']);
  }

  editProduct(product: any) {
    this.router.navigate(['/admin/products', product.id, 'edit']);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminProductsService.delete(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete product. Please try again.';
          console.error('Error deleting product:', err);
        },
      });
    }
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return 'http://localhost:5069/' + imageUrl;
  }

  getCategoryName(product: any): string {
    // Attempt to match categoryId from our fetched categories list
    if (product.categoryId && this.categories.length > 0) {
      const foundCategory = this.categories.find(c => c.id === product.categoryId);
      if (foundCategory) {
        return foundCategory.name;
      }
    }

    // Fallbacks
    if (product.category && product.category.name) {
      return product.category.name;
    }
    if (product.categoryName) {
      return product.categoryName;
    }
    return '—';
  }
}
