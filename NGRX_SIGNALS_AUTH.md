# NgRx SignalStore Authentication Documentation

## Overview

This Angular POS Portal application now uses **NgRx SignalStore** for modern, reactive authentication state management. This provides better performance, simpler state updates, and automatic type safety.

## Architecture

### AuthStore (`/src/app/stores/auth.store.ts`)

The authentication store is built using NgRx SignalStore with the following structure:

```typescript
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(selectors),
  withMethods(actions)
);
```

#### State Interface
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
```

#### Key Features

1. **Signal-based State**: All state properties are signals that update reactively
2. **Computed Selectors**: Derived values that automatically update when state changes
3. **Type Safety**: Full TypeScript support with proper type inference
4. **Performance**: Minimal re-renders with fine-grained reactivity

### Computed Values

The store provides several computed values:

- `userDisplayName`: Full name or username fallback
- `userInitials`: First/last name initials for avatars
- `userRole`: Current user's role
- `isAdmin`: Boolean check for admin role
- `hasPermission`: Function to check specific permissions
- `userEmail`: Current user's email
- `isUserActive`: User active status

### Methods

#### Authentication Actions
- `loginSuccess(user, token, refreshToken?)`: Set successful login state
- `loginFailure(error)`: Set login error state
- `logout()`: Clear all auth data
- `setLoading(loading)`: Update loading state
- `setError(error)`: Set error message
- `clearError()`: Clear error state

#### User Management
- `updateUser(user)`: Update user profile
- `updateToken(token, refreshToken?)`: Update authentication tokens
- `updateProfile(updates)`: Partial profile updates

#### Permission Checking
- `hasRole(role)`: Check specific role
- `hasAnyRole(roles[])`: Check multiple roles
- `hasPermissions(permissions[])`: Check required permissions
- `hasAnyPermission(permissions[])`: Check any of the permissions

#### State Management
- `restoreState(state)`: Restore from localStorage
- `resetState()`: Reset to initial state

## AuthService Integration

The `AuthService` (`/src/app/services/auth.service.ts`) now integrates with the NgRx SignalStore:

```typescript
export class AuthService {
  private authStore = inject(AuthStore);
  
  // Expose store signals as getters
  get authIsAuthenticated() { return this.authStore.isAuthenticated; }
  get authUser() { return this.authStore.user; }
  get userDisplayName() { return this.authStore.userDisplayName; }
  // ... more getters
}
```

### Key Methods

- `login(credentials)`: Authenticate user and update store
- `logout()`: Clear authentication state
- `refreshToken()`: Refresh expired tokens
- `getCurrentUser()`: Get current user snapshot
- `hasRole(role)`: Check user permissions
- `hasAnyRole(roles)`: Check multiple roles

## Component Integration

### LoginComponent

```typescript
export class LoginComponent {
  // Access auth signals through service
  get loading() { return this.authService.authLoading(); }
  get error() { return this.authService.authError(); }
  
  async onSubmit() {
    if (this.loginForm.valid) {
      await this.authService.login(this.loginForm.value);
    }
  }
}
```

### DashboardComponent

```typescript
export class DashboardComponent {
  // Access computed values
  get user() { return this.authService.authUser(); }
  get userDisplayName() { return this.authService.userDisplayName(); }
  get isAdmin() { return this.authService.isAdmin(); }
}
```

## Benefits of NgRx SignalStore

### 1. **Performance**
- Fine-grained reactivity - only components using specific signals re-render
- No unnecessary subscriptions or memory leaks
- Automatic cleanup when components are destroyed

### 2. **Developer Experience**
- Simpler syntax compared to traditional NgRx
- Full type safety with TypeScript
- Better debugging with Angular DevTools

### 3. **Reactive Patterns**
- Signals integrate seamlessly with Angular's change detection
- Computed values automatically update when dependencies change
- Effects for side effects (HTTP requests, localStorage updates)

### 4. **Scalability**
- Easy to extend with additional state properties
- Composable store features with `withState`, `withComputed`, `withMethods`
- Testable with simple unit tests

## Migration from BehaviorSubject

The migration from the previous BehaviorSubject-based approach included:

1. **State Structure**: Converted from manual BehaviorSubject management to NgRx SignalStore
2. **Method Updates**: Replaced custom state methods with store actions
3. **Component Integration**: Updated components to use signal getters
4. **Type Safety**: Improved type inference and safety

## Usage Examples

### Checking Authentication
```typescript
// In template
@if (authService.authIsAuthenticated()) {
  <div>Welcome, {{ authService.userDisplayName() }}!</div>
}

// In component
ngOnInit() {
  if (this.authService.authIsAuthenticated()) {
    this.loadUserData();
  }
}
```

### Permission-based UI
```typescript
// In template
@if (authService.isAdmin()) {
  <button>Admin Panel</button>
}

// In component guard
canActivate(): boolean {
  return this.authService.hasAnyRole(['admin', 'manager']);
}
```

### Error Handling
```typescript
// In template
@if (authService.authError(); as error) {
  <div class="error">{{ error }}</div>
}

// In component
async login() {
  try {
    await this.authService.login(credentials);
    this.router.navigate(['/dashboard']);
  } catch (error) {
    // Error automatically stored in authStore.error signal
  }
}
```

## Environment Setup

Make sure you have the NgRx Signals package installed:

```bash
npm install @ngrx/signals
```

## Testing

The NgRx SignalStore is easily testable:

```typescript
describe('AuthStore', () => {
  let store: InstanceType<typeof AuthStore>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AuthStore);
  });
  
  it('should login successfully', () => {
    const user = { id: '1', username: 'test' };
    store.loginSuccess(user, 'token');
    
    expect(store.isAuthenticated()).toBe(true);
    expect(store.user()).toEqual(user);
  });
});
```

## Future Enhancements

1. **Persistence**: Add automatic localStorage sync with effects
2. **Caching**: Implement user data caching strategies
3. **Optimistic Updates**: Add optimistic UI updates for better UX
4. **Real-time**: Integrate with WebSocket for real-time auth status
5. **Multi-tenant**: Extend for multi-tenant authentication

This NgRx SignalStore implementation provides a modern, performant, and maintainable foundation for authentication state management in the Angular POS Portal application.
