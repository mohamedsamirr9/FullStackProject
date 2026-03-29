import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from '../../services/admin-products-service';
import { CategoriesService } from '../../../../products/services/categories-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  productId!: number;
  categories: any[] = [];
  
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminProductsService: AdminProductsService,
    private categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''), // Optional field from backend
      price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', Validators.required), // Matches DTO
      imageUrl: new FormControl(''),
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.errorMessage = 'Could not load categories';
      }
    });
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.adminProductsService.getById(id).subscribe({
      next: (product) => {
        // Backend returns "categoryName" but we need the raw "categoryId" to edit
        // Wait for categories to finish loading to map correctly if needed,
        // but typically the product returned should contain a CategoryId.
        // If the backend DTO only sends CategoryName out, we need to find its ID.
        let catId = product.categoryId;
        if (!catId && product.categoryName && this.categories.length > 0) {
           const found = this.categories.find(c => c.name === product.categoryName);
           if (found) catId = found.id;
        }

        this.productForm.patchValue({
          name: product.name,
          description: product.description || '',
          price: product.price,
          quantity: product.quantity,
          categoryId: catId || '',
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load product', err);
        this.errorMessage = 'Failed to load product details for editing.';
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    // In Add mode, we absolutely need an image if the backend expects it.
    // However, the DTO marks it as nullable. Let's make it required for creation for UX.
    if (!this.isEditMode && !this.selectedFile) {
        this.productForm.get('imageUrl')?.setErrors({ required: true });
        return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('Name', this.productForm.value.name);
    formData.append('Description', this.productForm.value.description);
    formData.append('Price', this.productForm.value.price.toString());
    formData.append('Quantity', this.productForm.value.quantity.toString());
    formData.append('CategoryId', this.productForm.value.categoryId);

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile);
    }

    if (this.isEditMode) {
      this.adminProductsService.update(this.productId, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to update product. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.adminProductsService.create(formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to add product. Please try again.';
          console.error(err);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  get f() {
    return this.productForm.controls;
  }
}
