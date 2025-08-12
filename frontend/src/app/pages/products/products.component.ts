import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, CreateProductDto, UpdateProductDto } from '../../models/product.model';

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
    
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products.set(products);
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
        const currentProducts = this.products();
        this.products.set([...currentProducts, product]);
        this.closeModal();
        this.isLoading.set(false);
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
        const currentProducts = this.products();
        const index = currentProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          const newProducts = [...currentProducts];
          newProducts[index] = updatedProduct;
          this.products.set(newProducts);
        }
        this.closeModal();
        this.isLoading.set(false);
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
          const currentProducts = this.products();
          this.products.set(currentProducts.filter(p => p.id !== id));
          this.isLoading.set(false);
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
}
