# Brand API Documentation

## Overview
The Brand API provides comprehensive CRUD operations for managing brands in the POS Portal system. This API was created based on the legacy .NET API service requirements and follows NestJS and TypeORM best practices.

## Base URL
- Development: `http://localhost:3000`
- Production: (to be configured with SQL Server)

## Brand Entity Structure
```typescript
interface Brand {
  id: string;              // UUID primary key
  name: string;            // Brand name (required)
  email?: string | null;   // Brand email
  address?: string | null; // Brand address
  phone?: string | null;   // Brand phone number
  picUrl?: string | null;  // Brand logo/picture URL
  status: string;          // Brand status (required)
  brandCode?: string | null; // Unique brand code
  brandBalance?: number | null; // Brand balance
}
```

## API Endpoints

### 1. Get All Brands
**GET** `/brands`

Get all brands with optional filtering by status.

**Query Parameters:**
- `status` (optional): Filter brands by status (e.g., "Active", "Inactive")

**Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Test Brand",
    "email": "contact@testbrand.com",
    "address": "123 Business St, City, State",
    "phone": "+1-555-0123",
    "picUrl": "https://example.com/logo.png",
    "status": "Active",
    "brandCode": "TB001",
    "brandBalance": 10000.50,
    "accountsCount": 5,
    "storesCount": 3,
    "productsCount": 150
  }
]
```

### 2. Get Brand by ID
**GET** `/brands/:id`

Get a specific brand by its ID with related entity counts.

**Path Parameters:**
- `id`: Brand UUID

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Test Brand",
  "email": "contact@testbrand.com",
  "address": "123 Business St, City, State",
  "phone": "+1-555-0123",
  "picUrl": "https://example.com/logo.png",
  "status": "Active",
  "brandCode": "TB001",
  "brandBalance": 10000.50,
  "accountsCount": 5,
  "storesCount": 3,
  "productsCount": 150
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "Brand with ID 123e4567-e89b-12d3-a456-426614174000 not found",
  "error": "Not Found"
}
```

### 3. Get Brand by Brand Code
**GET** `/brands/code/:brandCode`

Get a brand by its unique brand code.

**Path Parameters:**
- `brandCode`: Unique brand code

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Test Brand",
  "email": "contact@testbrand.com",
  "address": "123 Business St, City, State",
  "phone": "+1-555-0123",
  "picUrl": "https://example.com/logo.png",
  "status": "Active",
  "brandCode": "TB001",
  "brandBalance": 10000.50,
  "accountsCount": 5,
  "storesCount": 3,
  "productsCount": 150
}
```

**Response when not found:**
```json
null
```

### 4. Create Brand
**POST** `/brands`

Create a new brand.

**Request Body:**
```json
{
  "name": "New Brand",
  "email": "contact@newbrand.com",
  "address": "456 Commerce Ave, City, State",
  "phone": "+1-555-0456",
  "picUrl": "https://example.com/newlogo.png",
  "status": "Active",
  "brandCode": "NB001",
  "brandBalance": 5000.00
}
```

**Response (201 Created):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "name": "New Brand",
  "email": "contact@newbrand.com",
  "address": "456 Commerce Ave, City, State",
  "phone": "+1-555-0456",
  "picUrl": "https://example.com/newlogo.png",
  "status": "Active",
  "brandCode": "NB001",
  "brandBalance": 5000.00,
  "accountsCount": 0,
  "storesCount": 0,
  "productsCount": 0
}
```

### 5. Update Brand
**PUT** `/brands/:id`

Update an existing brand.

**Path Parameters:**
- `id`: Brand UUID

**Request Body:**
```json
{
  "name": "Updated Brand Name",
  "email": "updated@testbrand.com",
  "status": "Active",
  "brandBalance": 15000.00
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Updated Brand Name",
  "email": "updated@testbrand.com",
  "address": "123 Business St, City, State",
  "phone": "+1-555-0123",
  "picUrl": "https://example.com/logo.png",
  "status": "Active",
  "brandCode": "TB001",
  "brandBalance": 15000.00,
  "accountsCount": 5,
  "storesCount": 3,
  "productsCount": 150
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "Brand with ID 123e4567-e89b-12d3-a456-426614174000 not found",
  "error": "Not Found"
}
```

### 6. Delete Brand
**DELETE** `/brands/:id`

Delete a brand by its ID.

**Path Parameters:**
- `id`: Brand UUID

**Response (204 No Content):**
No response body.

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "Brand with ID 123e4567-e89b-12d3-a456-426614174000 not found",
  "error": "Not Found"
}
```

## Features

### Key Capabilities
- **Complete CRUD Operations**: Create, Read, Update, Delete brands
- **Filtering**: Filter brands by status
- **Brand Code Lookup**: Find brands by unique brand code
- **Relationship Counts**: Get counts of related entities (accounts, stores, products)
- **Error Handling**: Proper HTTP status codes and error messages
- **Type Safety**: Full TypeScript support with DTOs
- **Database Integration**: TypeORM with proper entity relationships

### Entity Relationships
The Brand entity has relationships with:
- `BrandAccount[]` - Brand accounts
- `BrandPartner[]` - Brand partnerships
- `BrandPaymentMapping[]` - Payment method mappings
- `Category[]` - Product categories
- `Collection[]` - Product collections
- `Menu[]` - Menus
- `Product[]` - Products
- `Promotion[]` - Promotions
- `Store[]` - Physical stores
- `Transaction[]` - Financial transactions
- `User[]` - Users associated with the brand

### Response Enhancements
- Includes counts of related entities for quick insights
- Consistent error handling with meaningful messages
- Proper HTTP status codes for all operations

## Testing

The Brand API includes comprehensive unit tests covering:
- Service instantiation
- CRUD operations (findAll, findOne, create, update, remove)
- Error scenarios (not found exceptions)
- Query operations (findByStatus, findByBrandCode)
- Repository interaction verification

Run tests with:
```bash
npm test
```

## Database Requirements

- **SQL Server**: Primary database for production
- **TypeORM**: Database ORM with automatic schema synchronization in development
- **Entity Relationships**: Properly configured foreign keys and relationships

## Usage Examples

### Create a new brand
```bash
curl -X POST http://localhost:3000/brands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Brand",
    "email": "contact@mynewbrand.com",
    "status": "Active",
    "brandCode": "MNB001"
  }'
```

### Get all active brands
```bash
curl -X GET "http://localhost:3000/brands?status=Active"
```

### Get brand by ID
```bash
curl -X GET http://localhost:3000/brands/123e4567-e89b-12d3-a456-426614174000
```

### Update a brand
```bash
curl -X PUT http://localhost:3000/brands/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Brand Name",
    "status": "Active"
  }'
```

### Delete a brand
```bash
curl -X DELETE http://localhost:3000/brands/123e4567-e89b-12d3-a456-426614174000
```

## Implementation Notes

This Brand API was implemented following the legacy .NET API service patterns mentioned in the requirements, with:

1. **Service Layer Pattern**: Business logic in `BrandsService`
2. **Repository Pattern**: TypeORM repository for data access
3. **DTO Pattern**: Data Transfer Objects for request/response validation
4. **Controller Pattern**: RESTful endpoints in `BrandsController`
5. **Module Pattern**: NestJS module organization
6. **Testing**: Comprehensive unit tests with mocking

The implementation ensures compatibility with the existing POS Portal architecture while providing a modern, type-safe, and well-tested API.