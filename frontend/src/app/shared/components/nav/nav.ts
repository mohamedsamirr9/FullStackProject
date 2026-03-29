import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CategoriesService } from '../../../features/products/services/categories-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsLocalService } from '../../../features/products/services/products-local-service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  categories: any[] = [];
  searchTerm: string = '';
  results: any[] = [];

  constructor(
    private router: Router,
    public auth: Auth,
    private categoryService: CategoriesService,
    private productService: ProductsLocalService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result;
      },
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  liveSearch() {
    if (this.searchTerm.length < 2) {
      this.results = [];
      return;
    }

    this.productService.searchProductsByName(this.searchTerm, 1, 5).subscribe((res) => {
      this.results = res.products;
    });
  }

  search() {
    this.router.navigate(['/products', this.searchTerm, 1, 10]);
    this.searchTerm = '';
    this.results = [];
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
    this.searchTerm = '';
    this.results = [];
  }
  getImageUrl(imageUrl: string): string {
    if (!imageUrl) return '';

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return 'http://localhost:5069/' + imageUrl;
  }
}
