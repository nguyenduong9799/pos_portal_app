import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, from } from 'rxjs';
import { Product, CreateProductDto, UpdateProductDto, PaginatedResponse, PaginationQuery } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = '/products';

  constructor(private httpService: HttpService) {}

  /**
   * Get all products (without pagination - for backward compatibility)
   */
  getAllProducts(): Observable<Product[]> {
    return from(this.httpService.get<Product[]>(this.baseUrl));
  }

  /**
   * Get products with pagination
   */
  getProducts(paginationQuery?: PaginationQuery): Observable<PaginatedResponse<Product>> {
    let url = this.baseUrl;
    if (paginationQuery) {
      const params = new URLSearchParams();
      if (paginationQuery.page) {
        params.append('page', paginationQuery.page.toString());
      }
      if (paginationQuery.limit) {
        params.append('limit', paginationQuery.limit.toString());
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    return from(this.httpService.get<PaginatedResponse<Product>>(url));
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
