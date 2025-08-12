import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private axiosInstance: any;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      timeout: environment.timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request sent:', config);
        return config;
      },
      (error: any) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        console.error('Response error:', error);

        // Handle common error responses
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          // Redirect to login or emit event
        }

        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T = any>(url: string, config?: any): Promise<T> {
    const response: any = await this.axiosInstance.get(url, config);
    return response.data;
  }

  // POST request
  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response: any = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  // PUT request
  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response: any = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response: any = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  // DELETE request
  async delete<T = any>(url: string, config?: any): Promise<T> {
    const response: any = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  // Method to update base URL
  setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  // Method to set auth token
  setAuthToken(token: string): void {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  }

  // Method to remove auth token
  removeAuthToken(): void {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
}
