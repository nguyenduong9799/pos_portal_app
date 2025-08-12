# Authentication API Documentation

This document describes the authentication API endpoints implemented in the POS Portal backend.

## Base URL
- Development: `http://localhost:3000`
- Production: (to be configured with SQL Server)

## Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string", 
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "id": "string",
  "username": "string", 
  "name": "string",
  "role": "string",
  "status": "string"
}
```

### 2. User Login
**POST** `/auth/login`

Authenticate a user and receive JWT tokens.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string", 
  "id": "string",
  "username": "string",
  "name": "string", 
  "role": "string",
  "status": "string"
}
```

### 3. User Logout
**POST** `/auth/logout`

Logout the current user (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### 4. Refresh Token
**POST** `/auth/refresh`

Refresh the access token using a refresh token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "refreshToken": "string"
}
```

### 5. Change Password
**POST** `/auth/change-password`

Change the user's password (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

### 6. Forgot Password
**POST** `/auth/forgot-password`

Request a password reset (currently logs to console).

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "message": "If email exists, password reset instructions have been sent"
}
```

### 7. Reset Password
**POST** `/auth/reset-password`

Reset password using a reset token (not fully implemented).

**Request Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

### 8. Get User Profile
**GET** `/accounts/{id}`

Get user profile information (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "name": "string",
  "role": "string", 
  "status": "string",
  "storeId": null,
  "storeCode": null,
  "brandId": null,
  "brandCode": null
}
```

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized 
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., username already exists)
- `500` - Internal Server Error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## Database Configuration

### Development/Testing
Uses SQLite in-memory database for easy development and testing.

### Production
Configure SQL Server connection in `.env` file:
```
DB_HOST=your-sql-server-host
DB_PORT=1433
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=pos_portal
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Token Expiration**: Access tokens expire in 1 hour, refresh tokens in 7 days
- **Role-based Access**: User roles (admin, manager, employee)
- **Input Validation**: Request validation and sanitization

## Testing

Run the test suite:
```bash
npm test
```

Manual API testing examples:
```bash
# Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}'

# Get user profile (use token from login response)
curl -X GET http://localhost:3000/accounts/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```