import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, CreateProductDto, UpdateProductDto, PaginationMeta } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  showModal = signal(false);
  editingProduct = signal<Product | null>(null);
  productForm: FormGroup;

  // Pagination state
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = signal(0);
  paginationMeta = signal<PaginationMeta | null>(null);

  // Page size options
  pageSizeOptions = [5, 10, 20, 50];

  // Make Math available in template
  Math = Math;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(500)],
      sku: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
      status: ['active', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.error.set(null);
    
    const paginationQuery = {
      page: this.currentPage(),
      limit: this.pageSize()
    };

    this.productService.getProducts(paginationQuery).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.paginationMeta.set(response.meta);
        this.totalItems.set(response.meta.total);
        this.totalPages.set(response.meta.totalPages);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to load products');
        this.isLoading.set(false);
      }
    });
  }

  openCreateModal() {
    this.editingProduct.set(null);
    this.productForm.reset({
      status: 'active',
      price: 0,
      cost: 0,
      stockQuantity: 0,
      minimumStock: 0
    });
    this.showModal.set(true);
  }

  openEditModal(product: Product) {
    this.editingProduct.set(product);
    this.productForm.patchValue(product);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingProduct.set(null);
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const editingProduct = this.editingProduct();

      if (editingProduct) {
        this.updateProduct(editingProduct.id!, formData);
      } else {
        this.createProduct(formData);
      }
    }
  }

  createProduct(productData: CreateProductDto) {
    this.isLoading.set(true);
    
    this.productService.createProduct(productData).subscribe({
      next: (product) => {
        this.closeModal();
        this.isLoading.set(false);
        // Reload current page to reflect changes
        this.loadProducts();
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to create product');
        this.isLoading.set(false);
      }
    });
  }

  updateProduct(id: number, productData: UpdateProductDto) {
    this.isLoading.set(true);
    
    this.productService.updateProduct(id, productData).subscribe({
      next: (updatedProduct) => {
        this.closeModal();
        this.isLoading.set(false);
        // Reload current page to reflect changes
        this.loadProducts();
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to update product');
        this.isLoading.set(false);
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.isLoading.set(true);
      
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.isLoading.set(false);
          // Check if we need to go to previous page if current page becomes empty
          const remainingItems = this.products().length - 1;
          if (remainingItems === 0 && this.currentPage() > 1) {
            this.goToPage(this.currentPage() - 1);
          } else {
            this.loadProducts();
          }
        },
        error: (error) => {
          this.error.set(error.message || 'Failed to delete product');
          this.isLoading.set(false);
        }
      });
    }
  }

  getStockStatus(product: Product): string {
    if (product.stockQuantity <= product.minimumStock) {
      return 'Low Stock';
    }
    return 'In Stock';
  }

  getStockStatusClass(product: Product): string {
    if (product.stockQuantity <= product.minimumStock) {
      return 'badge-error';
    }
    return 'badge-success';
  }

  // Pagination methods
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }

  nextPage() {
    const meta = this.paginationMeta();
    if (meta && meta.hasNextPage) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage() {
    const meta = this.paginationMeta();
    if (meta && meta.hasPreviousPage) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  changePageSize(newSize: number) {
    this.pageSize.set(newSize);
    this.currentPage.set(1); // Reset to first page when changing page size
    this.loadProducts();
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2; // Show 2 pages on each side of current page
    
    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);
    
    // Adjust if we're near the beginning or end
    if (end - start < 2 * delta) {
      if (start === 1) {
        end = Math.min(total, start + 2 * delta);
      } else {
        start = Math.max(1, end - 2 * delta);
      }
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
