# Authentication System Documentation

This document describes the complete authentication system implemented for the Angular POS Portal application.

## 📁 File Structure

```
src/app/
├── components/
│   ├── login/
│   │   ├── login.component.ts       # Login form component
│   │   ├── login.component.html     # Login form template
│   │   └── login.component.scss     # Login form styles
│   └── dashboard/
│       ├── dashboard.component.ts   # Main dashboard component
│       ├── dashboard.component.html # Dashboard template
│       └── dashboard.component.scss # Dashboard styles
├── services/
│   ├── auth.service.ts              # Main authentication service
│   ├── auth-store.service.ts        # State management for auth data
│   ├── http.service.ts              # Axios HTTP client service
│   └── error-handler.service.ts     # Error handling utilities
├── guards/
│   └── auth.guard.ts                # Route protection guard
└── app.routes.ts                    # Application routing configuration
```

## 🔐 Authentication Flow

### 1. Login Process
1. User enters credentials in login form
2. `AuthService.login()` is called
3. HTTP request sent to `/auth/login` endpoint
4. On success:
   - Token stored in localStorage and HTTP service
   - User data stored in localStorage
   - Auth store updated with user and token
   - User redirected to dashboard

### 2. Route Protection
1. User tries to access protected route
2. `AuthGuard.canActivate()` is called
3. Guard checks authentication status via `AuthService`
4. If authenticated: allow access
5. If not authenticated: redirect to login with return URL

### 3. Token Management
- Tokens are automatically included in HTTP requests via interceptors
- Refresh tokens can be used to get new access tokens
- Automatic logout on token expiration (401 responses)

## 🛠️ Services

### AuthService

Main authentication service that handles all auth operations.

**Key Methods:**
```typescript
// Authentication
login(credentials: LoginCredentials): Promise<LoginResponse>
logout(): Promise<void>
register(userData: RegisterData): Promise<LoginResponse>

// Token management
refreshToken(): Promise<string>
isAuthenticated(): boolean
getToken(): string | null

// User management
getCurrentUser(): User | null
updateProfile(userData: Partial<User>): Promise<User>
changePassword(currentPassword: string, newPassword: string): Promise<void>

// Role-based access
hasRole(role: string): boolean
hasAnyRole(roles: string[]): boolean

// Password reset
forgotPassword(email: string): Promise<void>
resetPassword(token: string, newPassword: string): Promise<void>
```

**Observables:**
```typescript
authState$: Observable<AuthStore>      // Complete auth state
isAuthenticated$: Observable<boolean>   // Authentication status
user$: Observable<User | null>         // Current user data
loading$: Observable<boolean>          // Loading state
error$: Observable<string | null>      // Error messages
```

### AuthStoreService

State management service using RxJS BehaviorSubject for reactive authentication state.

**Key Features:**
- Centralized state management
- Reactive updates via observables
- Computed selectors (isAdmin$, userRole$, etc.)
- Type-safe state updates

**State Interface:**
```typescript
interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### HttpService

Enhanced Axios client with authentication support.

**Features:**
- Automatic token injection via request interceptors
- Error handling via response interceptors
- Automatic logout on 401 responses
- Token management methods

## 🎨 Components

### LoginComponent

**Features:**
- Reactive form validation
- Loading states during authentication
- Error message display
- Remember me functionality
- Navigation to register/forgot password

**Form Validation:**
- Username: Required, minimum 3 characters
- Password: Required, minimum 6 characters

### DashboardComponent

**Features:**
- User information display
- Navigation cards for different sections
- User profile access
- Logout functionality
- Protected route (requires authentication)

## 🛡️ Security Features

### Route Protection

```typescript
// Protect routes with AuthGuard
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}

// Role-based route protection
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard],
  data: { roles: ['admin'] }
}
```

### HTTP Interceptors

**Request Interceptor:**
- Automatically adds Authorization header with Bearer token
- Logs requests in development mode

**Response Interceptor:**
- Handles common HTTP errors
- Automatic logout on 401 (Unauthorized)
- Error logging and user-friendly messages

### Token Storage

- Access tokens stored in localStorage
- Refresh tokens stored separately
- Automatic cleanup on logout
- XSS protection considerations

## 🔄 State Management

### Reactive Architecture

The authentication system uses RxJS observables for reactive state management:

```typescript
// Subscribe to authentication status
this.authService.isAuthenticated$.subscribe(isAuth => {
  if (isAuth) {
    // User is logged in
  } else {
    // User is logged out
  }
});

// Subscribe to current user
this.authService.user$.subscribe(user => {
  this.currentUser = user;
});

// Subscribe to loading state
this.authService.loading$.subscribe(loading => {
  this.isLoading = loading;
});
```

### State Persistence

- User data and tokens persist across browser sessions
- Automatic state restoration on app initialization
- Graceful handling of corrupted stored data

## 📱 Usage Examples

### Basic Authentication Check

```typescript
// In component
export class MyComponent implements OnInit {
  isLoggedIn$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
```

### Role-Based UI

```typescript
// In template
<div *ngIf="authService.hasRole('admin')">
  Admin only content
</div>

<div *ngIf="authService.hasAnyRole(['admin', 'manager'])">
  Admin or Manager content
</div>
```

### Protected API Calls

```typescript
// HTTP service automatically adds auth headers
async loadUserData() {
  try {
    const userData = await this.httpService.get('/api/user/profile');
    return userData;
  } catch (error) {
    // Error handling (including auth errors) is automatic
    console.error('Failed to load user data:', error);
  }
}
```

## 🔧 Configuration

### Environment Setup

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  timeout: 10000
};
```

### API Endpoints

The system expects the following API endpoints:

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Expected API Responses

**Login Response:**
```typescript
{
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
  refreshToken?: string;
}
```

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install axios @types/axios rxjs
   ```

2. **Update Routes:**
   ```typescript
   import { AuthGuard } from './guards/auth.guard';
   import { LoginComponent } from './components/login/login.component';
   
   const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { 
       path: 'dashboard', 
       component: DashboardComponent,
       canActivate: [AuthGuard]
     }
   ];
   ```

3. **Use in Components:**
   ```typescript
   constructor(private authService: AuthService) {}
   
   async login() {
     try {
       await this.authService.login(credentials);
       // Handle success
     } catch (error) {
       // Handle error
     }
   }
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Token not being sent with requests**
   - Check if HttpService is properly configured
   - Verify token is stored in localStorage
   - Check request interceptor setup

2. **Infinite redirect loops**
   - Verify AuthGuard logic
   - Check route configuration
   - Ensure login route is not protected

3. **Authentication state not updating**
   - Check if components are subscribing to auth observables
   - Verify AuthStore is being updated properly
   - Check for memory leaks in subscriptions

## 🧪 Testing

### Unit Testing

```typescript
// Test authentication service
describe('AuthService', () => {
  it('should login user successfully', async () => {
    const credentials = { username: 'test', password: 'password' };
    const result = await authService.login(credentials);
    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
  });
});
```

### E2E Testing

```typescript
// Test login flow
it('should allow user to login', () => {
  cy.visit('/login');
  cy.get('[data-cy=username]').type('testuser');
  cy.get('[data-cy=password]').type('password');
  cy.get('[data-cy=login-button]').click();
  cy.url().should('include', '/dashboard');
});
```

## 📚 Additional Resources

- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS Observables](https://rxjs.dev/guide/observable)
- [Angular Route Guards](https://angular.io/guide/router-tutorial-toh#milestone-5-route-guards)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
