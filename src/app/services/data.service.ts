import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ErrorHandlerService } from './error-handler.service';

// Example interfaces for your POS data
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Sale {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpService: HttpService,
    private errorHandler: ErrorHandlerService
  ) {}

  // User-related methods
  async getUsers(): Promise<User[]> {
    try {
      return await this.httpService.get<User[]>('/users');
    } catch (error) {
      const errorResponse = this.errorHandler.handleError(error);
      throw new Error(errorResponse.message);
    }
  }

  async getUserById(id: number): Promise<User> {
    return this.httpService.get<User>(`/users/${id}`);
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.httpService.post<User>('/users', user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.httpService.put<User>(`/users/${id}`, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.httpService.delete<void>(`/users/${id}`);
  }

  // Product-related methods
  async getProducts(): Promise<Product[]> {
    try {
      return await this.httpService.get<Product[]>('/products');
    } catch (error) {
      const errorResponse = this.errorHandler.handleError(error);
      throw new Error(errorResponse.message);
    }
  }

  async getProductById(id: number): Promise<Product> {
    return this.httpService.get<Product>(`/products/${id}`);
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    return this.httpService.post<Product>('/products', product);
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    return this.httpService.put<Product>(`/products/${id}`, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.httpService.delete<void>(`/products/${id}`);
  }

  // Sale-related methods
  async getSales(): Promise<Sale[]> {
    return this.httpService.get<Sale[]>('/sales');
  }

  async getSaleById(id: number): Promise<Sale> {
    return this.httpService.get<Sale>(`/sales/${id}`);
  }

  async createSale(sale: Partial<Sale>): Promise<Sale> {
    return this.httpService.post<Sale>('/sales', sale);
  }

  // Authentication methods
  async login(credentials: { username: string; password: string }): Promise<{ token: string; user: User }> {
    const response = await this.httpService.post<{ token: string; user: User }>('/auth/login', credentials);
    
    // Store the token using the HttpService method
    this.httpService.setAuthToken(response.token);
    
    return response;
  }

  async logout(): Promise<void> {
    this.httpService.removeAuthToken();
    return this.httpService.post<void>('/auth/logout');
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await this.httpService.post<{ token: string }>('/auth/refresh');
    this.httpService.setAuthToken(response.token);
    return response;
  }
}
