#!/bin/bash

# Brand API Test Script
# This script demonstrates the Brand API endpoints
# Note: Requires a running server with proper database connection

BASE_URL="http://localhost:3000"

echo "=== Brand API Test Script ==="
echo "Base URL: $BASE_URL"
echo ""

echo "1. Testing GET /brands (Get all brands)"
echo "curl -X GET $BASE_URL/brands"
echo ""

echo "2. Testing GET /brands?status=Active (Filter by status)"
echo "curl -X GET '$BASE_URL/brands?status=Active'"
echo ""

echo "3. Testing POST /brands (Create brand)"
echo "curl -X POST $BASE_URL/brands \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"Test Brand\","
echo "    \"email\": \"test@brand.com\","
echo "    \"status\": \"Active\","
echo "    \"brandCode\": \"TB001\""
echo "  }'"
echo ""

echo "4. Testing GET /brands/:id (Get brand by ID)"
echo "curl -X GET $BASE_URL/brands/YOUR_BRAND_ID"
echo ""

echo "5. Testing GET /brands/code/:brandCode (Get brand by code)"
echo "curl -X GET $BASE_URL/brands/code/TB001"
echo ""

echo "6. Testing PUT /brands/:id (Update brand)"
echo "curl -X PUT $BASE_URL/brands/YOUR_BRAND_ID \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"Updated Brand Name\","
echo "    \"status\": \"Active\""
echo "  }'"
echo ""

echo "7. Testing DELETE /brands/:id (Delete brand)"
echo "curl -X DELETE $BASE_URL/brands/YOUR_BRAND_ID"
echo ""

echo "=== Setup Instructions ==="
echo "1. Configure your database connection in .env file"
echo "2. Start the server: npm run start:dev"
echo "3. Replace YOUR_BRAND_ID with actual brand UUID from step 3"
echo "4. Run the curl commands above to test the API"
echo ""

echo "=== Expected Response Structure ==="
echo "{"
echo "  \"id\": \"uuid\","
echo "  \"name\": \"string\","
echo "  \"email\": \"string|null\","
echo "  \"address\": \"string|null\","
echo "  \"phone\": \"string|null\","
echo "  \"picUrl\": \"string|null\","
echo "  \"status\": \"string\","
echo "  \"brandCode\": \"string|null\","
echo "  \"brandBalance\": \"number|null\","
echo "  \"accountsCount\": \"number\","
echo "  \"storesCount\": \"number\","
echo "  \"productsCount\": \"number\""
echo "}"