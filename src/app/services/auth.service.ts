import { Injectable, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AuthStore, User } from '../stores/auth.store';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStore = inject(AuthStore);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  constructor(
    private httpService: HttpService
  ) {
    this.initializeAuthState();
    this.setupAuthEffects();
  }

  // Helper method for safe localStorage access
  private safeLocalStorageAccess<T>(action: () => T, fallback: T): T {
    if (!isPlatformBrowser(this.platformId)) {
      return fallback;
    }
    try {
      return action();
    } catch (error) {
      console.error('LocalStorage access error:', error);
      return fallback;
    }
  }

  // Expose auth store signals and computed values as getters
  get store() { return this.authStore; }
  get authIsAuthenticated() { return this.authStore.isAuthenticated; }
  get authUser() { return this.authStore.user; }
  get authToken() { return this.authStore.token; }
  get authLoading() { return this.authStore.isLoading; }
  get authError() { return this.authStore.error; }
  get userRole() { return this.authStore.userRole; }
  get isAdmin() { return this.authStore.isAdmin; }
  get userDisplayName() { return this.authStore.userDisplayName; }
  get userInitials() { return this.authStore.userInitials; }
  get userEmail() { return this.authStore.userEmail; }

  // Convert signals to observables for backward compatibility
  get authState$(): Observable<any> { return toObservable(this.authStore.user); }
  get isAuthenticated$(): Observable<boolean> { return toObservable(this.authStore.isAuthenticated); }
  get user$(): Observable<User | null> { return toObservable(this.authStore.user); }
  get loading$(): Observable<boolean> { return toObservable(this.authStore.isLoading); }
  get error$(): Observable<string | null> { return toObservable(this.authStore.error); }

  // Initialize auth state from localStorage
  private initializeAuthState(): void {
    const token = this.safeLocalStorageAccess(() => localStorage.getItem('authToken'), null);
    const user = this.safeLocalStorageAccess(() => localStorage.getItem('user'), null);
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        this.authStore.loginSuccess(parsedUser, token);
        this.httpService.setAuthToken(token);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearAuthData();
      }
    }
  }

  // Setup effects for reactive behavior
  private setupAuthEffects(): void {
    // Effect to update HTTP service when token changes
    effect(() => {
      const token = this.authToken();
      if (token) {
        this.httpService.setAuthToken(token);
      }
    });

    // Effect to clear HTTP token when user logs out
    effect(() => {
      const isAuth = this.authIsAuthenticated();
      if (!isAuth) {
        this.httpService.removeAuthToken();
      }
    });
  }

  // Login method
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      const response = await this.httpService.post<LoginResponse>('/auth/login', credentials);
      
      // Store auth data
      this.httpService.setAuthToken(response.token);
      this.safeLocalStorageAccess(() => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return true;
      }, false);

      // Update auth store
      this.authStore.loginSuccess(response.user, response.token, response.refreshToken);

      return response;
    } catch (error: any) {
      this.authStore.loginFailure(error.message || 'Login failed');
      throw error;
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      this.authStore.setLoading(true);
      await this.httpService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
      this.authStore.setLoading(false);
    }
  }

  // Register method
  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<LoginResponse> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      const response = await this.httpService.post<LoginResponse>('/auth/register', userData);
      
      // Auto-login after registration
      this.httpService.setAuthToken(response.token);
      this.safeLocalStorageAccess(() => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return true;
      }, false);

      this.authStore.loginSuccess(response.user, response.token, response.refreshToken);

      return response;
    } catch (error: any) {
      this.authStore.loginFailure(error.message || 'Registration failed');
      throw error;
    }
  }

  // Refresh token method
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = this.safeLocalStorageAccess(() => localStorage.getItem('refreshToken'), null);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.httpService.post<{ token: string; refreshToken?: string }>('/auth/refresh', {
        refreshToken
      });

      this.httpService.setAuthToken(response.token);
      this.safeLocalStorageAccess(() => {
        localStorage.setItem('authToken', response.token);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return true;
      }, false);

      // Update auth store with new token
      const currentUser = this.authStore.user();
      if (currentUser) {
        this.authStore.updateToken(response.token, response.refreshToken);
      }

      return response.token;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.authStore.user();
  }

  // Check if user is authenticated (legacy method)
  isUserAuthenticated(): boolean {
    return this.authStore.isAuthenticated();
  }

  // Get current token
  getToken(): string | null {
    return this.authStore.token();
  }

  // Check user role
  hasRole(role: string): boolean {
    return this.authStore.hasRole(role);
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles: string[]): boolean {
    return this.authStore.hasAnyRole(roles);
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      const response = await this.httpService.put<User>('/auth/profile', userData);
      
      // Update stored user data
      this.safeLocalStorageAccess(() => {
        localStorage.setItem('user', JSON.stringify(response));
        return true;
      }, false);
      
      // Update auth store
      this.authStore.updateUser(response);

      return response;
    } catch (error: any) {
      this.authStore.setError(error.message || 'Profile update failed');
      throw error;
    } finally {
      this.authStore.setLoading(false);
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      await this.httpService.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error: any) {
      this.authStore.setError(error.message || 'Password change failed');
      throw error;
    } finally {
      this.authStore.setLoading(false);
    }
  }

  // Clear authentication data
  private clearAuthData(): void {
    this.httpService.removeAuthToken();
    this.safeLocalStorageAccess(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      return true;
    }, false);
    this.authStore.logout();
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      await this.httpService.post('/auth/forgot-password', { email });
    } catch (error: any) {
      this.authStore.setError(error.message || 'Forgot password request failed');
      throw error;
    } finally {
      this.authStore.setLoading(false);
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      await this.httpService.post('/auth/reset-password', {
        token,
        newPassword
      });
    } catch (error: any) {
      this.authStore.setError(error.message || 'Password reset failed');
      throw error;
    } finally {
      this.authStore.setLoading(false);
    }
  }
}
