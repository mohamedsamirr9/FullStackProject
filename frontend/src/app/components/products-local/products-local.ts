import { Component, OnInit } from '@angular/core';
import { ProductsLocalService } from '../../services/products-local-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-local',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products-local.html',
  styleUrl: './products-local.css',
})
export class ProductsLocal implements OnInit {
  products: any[] = [];
  totalPages: number = 0;
  categoryName: string = '';
  seaarchTerm: string = '';
  isLoading: boolean = false;
  start: number = 1;
  end: number = 0;
  page: number = 1;
  pages: number[] = [];

  constructor(
    private productLocalService: ProductsLocalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.seaarchTerm = params.get('searchTerm') || '';
      if (this.seaarchTerm) {
        this.searchProductsByName(this.seaarchTerm);
        return;
      }
      const categoryId = params.get('id');
      this.categoryName = params.get('name') || '';
      if (categoryId) {
        this.getProductsByCategoryByPage(+categoryId);
        return;
      } else {
        this.getProductsByPage();
      }
    });
  }
  displayPageNumbers() {
    this.pages = [];
    this.end = Math.min(this.start + 4, this.totalPages);
    this.start = this.start - 2 > 0 ? this.start - 2 : 1;
    for (let i = this.start; i <= this.end; i++) {
      this.pages.push(i);
    }
  }
  goToPage(page: number) {
    if (this.seaarchTerm) {
      console.log(this.seaarchTerm);
      this.router.navigate(['/products', this.seaarchTerm, page, 10]);
      return;
    }
    if (this.categoryName) {
      this.router.navigate([
        '/products/category',
        this.route.snapshot.paramMap.get('id'),
        this.categoryName,
        page,
        10,
      ]);
    } else {
      this.router.navigate(['/products', page, 10]);
    }
  }
  firstPage() {
    if (this.seaarchTerm) {
      this.router.navigate(['/products', this.seaarchTerm, 1, 10]);
      return;
    }
    if (this.categoryName) {
      this.router.navigate([
        '/products/category',
        this.route.snapshot.paramMap.get('id'),
        this.categoryName,
        1,
        10,
      ]);
    } else {
      this.router.navigate(['/products', 1, 10]);
    }
  }
  lastPage() {
    if (this.seaarchTerm) {
      this.router.navigate(['/products', this.seaarchTerm, this.totalPages, 10]);
      return;
    }
    if (this.categoryName) {
      this.router.navigate([
        '/products/category',
        this.route.snapshot.paramMap.get('id'),
        this.categoryName,
        this.totalPages,
        10,
      ]);
    } else {
      this.router.navigate(['/products', this.totalPages, 10]);
    }
  }

  getProductsByPage() {
    const page = Number(this.route.snapshot.paramMap.get('page'));
    const pageSize = Number(this.route.snapshot.paramMap.get('pageSize'));
    this.isLoading = true;
    this.productLocalService.getProductsByPage(page, pageSize).subscribe({
      next: (result) => {
        this.updateProducts(result, page);
      },
    });
  }
  getProductsByCategoryByPage(categoryId: number) {
    const page = Number(this.route.snapshot.paramMap.get('page'));
    const pageSize = Number(this.route.snapshot.paramMap.get('pageSize'));
    this.isLoading = true;
    this.productLocalService.getProductsByCategoryByPage(categoryId, page, pageSize).subscribe({
      next: (result) => {
        this.updateProducts(result, page);
      },
    });
  }
  getProductsByCategory(id: number) {
    this.isLoading = true;
    this.productLocalService.getProductsByCategory(id).subscribe({
      next: (result) => {
        this.products = result;
        console.log(this.products);
        this.isLoading = false;
      },
    });
  }
  searchProductsByName(name: string) {
    const page = Number(this.route.snapshot.paramMap.get('page'));
    const pageSize = Number(this.route.snapshot.paramMap.get('pageSize'));
    console.log(page, pageSize);
    this.isLoading = true;
    this.productLocalService.searchProductsByName(name, page, pageSize).subscribe({
      next: (result) => {
        this.updateProducts(result, page);
      },
    });
  }
  updateProducts(result: any, page: number) {
    this.page = page;
    this.start = result.page;
    this.products = result.products;
    this.totalPages = Math.ceil(result.total / result.pageSize);
    this.displayPageNumbers();
    this.isLoading = false;
  }
}
