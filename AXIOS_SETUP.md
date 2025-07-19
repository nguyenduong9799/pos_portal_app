# Axios HTTP Client Setup for Angular POS Portal

This project has been configured to use Axios as the HTTP client for making API requests.

## 📁 Project Structure

```
src/
├── app/
│   ├── services/
│   │   ├── http.service.ts          # Main Axios HTTP client service
│   │   ├── data.service.ts          # Data access layer using HTTP service
│   │   └── error-handler.service.ts # Error handling utilities
│   ├── app.component.ts             # Example usage of the services
│   └── ...
├── environments/
│   ├── environment.ts              # Development environment config
│   └── environment.prod.ts         # Production environment config
└── ...
```

## 🚀 Features

- **Axios HTTP Client**: Configured with interceptors for requests and responses
- **Error Handling**: Centralized error handling with meaningful error messages
- **Authentication**: Built-in token management for Bearer authentication
- **Environment Configuration**: Different API endpoints for dev/prod environments
- **TypeScript Support**: Fully typed interfaces and responses
- **Request/Response Interceptors**: Automatic token injection and error handling

## 🔧 Configuration

### Environment Setup

Update the API URLs in the environment files:

**Development (`src/environments/environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  timeout: 10000
};
```

**Production (`src/environments/environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  timeout: 10000
};
```

## 📝 Usage Examples

### Basic HTTP Requests

```typescript
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor(private httpService: HttpService) {}

  // GET request
  async getUsers() {
    return await this.httpService.get('/users');
  }

  // POST request
  async createUser(userData: any) {
    return await this.httpService.post('/users', userData);
  }

  // PUT request
  async updateUser(id: number, userData: any) {
    return await this.httpService.put(\`/users/\${id}\`, userData);
  }

  // DELETE request
  async deleteUser(id: number) {
    return await this.httpService.delete(\`/users/\${id}\`);
  }
}
```

### Authentication

```typescript
// Login and set token
async login(credentials: {username: string, password: string}) {
  const response = await this.httpService.post('/auth/login', credentials);
  this.httpService.setAuthToken(response.token);
  return response;
}

// Logout and remove token
logout() {
  this.httpService.removeAuthToken();
}
```

### Error Handling

```typescript
import { ErrorHandlerService } from './error-handler.service';

constructor(
  private httpService: HttpService,
  private errorHandler: ErrorHandlerService
) {}

async getData() {
  try {
    return await this.httpService.get('/data');
  } catch (error) {
    const errorResponse = this.errorHandler.handleError(error);
    console.error('Error:', errorResponse.message);
    throw new Error(errorResponse.message);
  }
}
```

## 🎯 Data Service Example

The `DataService` provides a complete example of how to structure your API calls:

```typescript
// Get all users
const users = await this.dataService.getUsers();

// Get user by ID
const user = await this.dataService.getUserById(1);

// Create new user
const newUser = await this.dataService.createUser({
  username: 'john_doe',
  email: 'john@example.com',
  role: 'user'
});

// Update user
const updatedUser = await this.dataService.updateUser(1, {
  email: 'newemail@example.com'
});

// Delete user
await this.dataService.deleteUser(1);
```

## 🔒 Security Features

1. **Automatic Token Management**: Tokens are automatically added to requests
2. **Request Interceptors**: Log outgoing requests and add authentication headers
3. **Response Interceptors**: Handle common HTTP status codes (401, 403, 500, etc.)
4. **Error Boundaries**: Graceful error handling with user-friendly messages

## 📊 HTTP Status Code Handling

The error handler automatically manages:
- **400**: Bad Request - Input validation errors
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **422**: Unprocessable Entity - Validation errors
- **500**: Internal Server Error - Backend issues
- **Network Errors**: Connection problems

## 🔄 Request/Response Cycle

1. **Request Interceptor**:
   - Adds authentication token if available
   - Logs request details (in development)
   - Sets common headers

2. **Response Interceptor**:
   - Logs response details (in development)
   - Handles common error status codes
   - Automatically redirects on authentication failures

## 🛠️ Development

To start the development server:

```bash
npm start
```

The app will try to connect to the API endpoint defined in `environment.ts`. Make sure your backend API is running on the configured port.

## 📦 Dependencies

- **axios**: HTTP client library
- **@types/axios**: TypeScript definitions for Axios

## 🌐 API Integration

This setup assumes your backend API follows RESTful conventions:

- `GET /users` - List all users
- `GET /users/:id` - Get specific user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Similar patterns for products, sales, and other entities.

## 🚀 Production Deployment

1. Update `environment.prod.ts` with your production API URL
2. Build the project: `npm run build`
3. Deploy the `dist/` folder to your web server

## 🤝 Contributing

When adding new API endpoints:
1. Add the interface definitions to the appropriate service
2. Implement the HTTP methods using the `HttpService`
3. Add proper error handling using `ErrorHandlerService`
4. Update this README with new examples
