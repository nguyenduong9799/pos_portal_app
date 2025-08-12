import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, from } from 'rxjs';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = '/products';

  constructor(private httpService: HttpService) {}

  /**
   * Get all products
   */
  getAllProducts(): Observable<Product[]> {
    return from(this.httpService.get<Product[]>(this.baseUrl));
  }

  /**
   * Get product by ID
   */
  getProductById(id: number): Observable<Product> {
    return from(this.httpService.get<Product>(`${this.baseUrl}/${id}`));
  }

  /**
   * Create a new product
   */
  createProduct(product: CreateProductDto): Observable<Product> {
    return from(this.httpService.post<Product>(this.baseUrl, product));
  }

  /**
   * Update an existing product
   */
  updateProduct(id: number, product: UpdateProductDto): Observable<Product> {
    return from(this.httpService.put<Product>(`${this.baseUrl}/${id}`, product));
  }

  /**
   * Delete a product
   */
  deleteProduct(id: number): Observable<void> {
    return from(this.httpService.delete<void>(`${this.baseUrl}/${id}`));
  }
}
