import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product code',
    example: 'PROD001',
  })
  code: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Sample Product',
  })
  name: string;

  @ApiProperty({
    description: 'Selling price',
    example: 29.99,
  })
  sellingPrice: number;

  @ApiPropertyOptional({
    description: 'Product picture URL',
    example: 'https://example.com/product.jpg',
  })
  picUrl?: string;

  @ApiProperty({
    description: 'Product status',
    example: 'active',
  })
  status: string;

  @ApiProperty({
    description: 'Historical price',
    example: 35.99,
  })
  historicalPrice: number;

  @ApiProperty({
    description: 'Discount price',
    example: 25.99,
  })
  discountPrice: number;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'This is a sample product description',
  })
  description?: string;

  @ApiProperty({
    description: 'Display order',
    example: 1,
  })
  displayOrder: number;

  @ApiPropertyOptional({
    description: 'Product size',
    example: 'Large',
  })
  size?: string;

  @ApiProperty({
    description: 'Product type',
    example: 'electronics',
  })
  type: string;

  @ApiPropertyOptional({
    description: 'Brand ID',
    example: 'brand-uuid-123',
  })
  brandId?: string;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: 'category-uuid-123',
  })
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Parent product ID',
    example: 'parent-product-uuid-123',
  })
  parentProductId?: string;
}
