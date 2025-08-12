# Database Migration Setup for POS System

This document describes the SQL Server database integration for the POS Portal Application.

## Database Configuration

### Connection String
- Server: 16.176.218.141
- Database: PosSystemProduction
- User ID: sa
- Password: zaQ@1234
- Port: 1433 (default SQL Server port)

### Environment Configuration
The database configuration is stored in the `.env` file:

```bash
DB_TYPE=mssql
DB_HOST=16.176.218.141
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=zaQ@1234
DB_DATABASE=PosSystemProduction
```

## Entities Created

The following entities have been created for the POS system:

### 1. User Entity (`users` table)
- Manages system users (admin, manager, employee)
- Fields: id, username, email, password, firstName, lastName, role, isActive
- Relationships: One-to-many with Orders

### 2. Product Entity (`products` table)
- Manages inventory items
- Fields: id, name, description, sku, price, cost, stockQuantity, minimumStock, imageUrl, isActive
- Relationships: Many-to-one with Category, One-to-many with OrderItems

### 3. Category Entity (`categories` table)
- Organizes products into categories
- Fields: id, name, description, imageUrl, isActive
- Relationships: One-to-many with Products

### 4. Customer Entity (`customers` table)
- Stores customer information
- Fields: id, firstName, lastName, email, phone, address, city, zipCode, isActive
- Relationships: One-to-many with Orders

### 5. Order Entity (`orders` table)
- Tracks sales transactions
- Fields: id, orderNumber, subtotal, taxAmount, discountAmount, total, status, notes
- Relationships: Many-to-one with User and Customer, One-to-many with OrderItems, One-to-one with Payment

### 6. OrderItem Entity (`order_items` table)
- Individual items within an order
- Fields: id, quantity, unitPrice, total, notes
- Relationships: Many-to-one with Order and Product

### 7. Payment Entity (`payments` table)
- Payment information for orders
- Fields: id, amount, method, status, transactionId, notes
- Relationships: One-to-one with Order

## Database Features

- **Auto-synchronization**: Enabled in development mode to automatically create tables based on entities
- **Connection pooling**: Handled by TypeORM and mssql driver
- **SQL logging**: Enabled for development debugging
- **SSL configuration**: Configured to work with SQL Server using trustServerCertificate option

## API Endpoints

### Products API (Example Implementation)
- `GET /products` - Get all products with category information
- `GET /products/:id` - Get specific product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update existing product
- `DELETE /products/:id` - Delete product

## Usage

### Running the Application
1. Ensure SQL Server is accessible at the configured connection string
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. Start development server: `npm run start:dev`

### Database Migrations
TypeORM is configured with `synchronize: true` in development mode, which automatically creates/updates database schema based on entities.

For production, it's recommended to:
1. Set `synchronize: false`
2. Use TypeORM migrations for schema changes
3. Generate migrations with: `npx typeorm migration:generate -n MigrationName`

## Security Considerations

- Environment variables are used for database credentials
- `.env` file is excluded from version control
- SQL Server connection uses SSL with trustServerCertificate for development
- Password validation and hashing should be implemented for User entity

## Next Steps

1. Implement remaining modules (Users, Categories, Orders, etc.)
2. Add data validation and DTOs
3. Implement authentication and authorization
4. Add proper error handling
5. Create database migrations for production deployment
6. Add unit and integration tests for database operations