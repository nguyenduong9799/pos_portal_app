import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product code',
    example: 'PROD002',
  })
  code?: string;

  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Updated Product Name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Selling price',
    example: 32.99,
  })
  sellingPrice?: number;

  @ApiPropertyOptional({
    description: 'Product picture URL',
    example: 'https://example.com/updated-product.jpg',
  })
  picUrl?: string;

  @ApiPropertyOptional({
    description: 'Product status',
    example: 'inactive',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Historical price',
    example: 38.99,
  })
  historicalPrice?: number;

  @ApiPropertyOptional({
    description: 'Discount price',
    example: 28.99,
  })
  discountPrice?: number;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Updated product description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Display order',
    example: 2,
  })
  displayOrder?: number;

  @ApiPropertyOptional({
    description: 'Product size',
    example: 'Medium',
  })
  size?: string;

  @ApiPropertyOptional({
    description: 'Product type',
    example: 'clothing',
  })
  type?: string;

  @ApiPropertyOptional({
    description: 'Brand ID',
    example: 'brand-uuid-456',
  })
  brandId?: string;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: 'category-uuid-456',
  })
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Parent product ID',
    example: 'parent-product-uuid-456',
  })
  parentProductId?: string;
}
