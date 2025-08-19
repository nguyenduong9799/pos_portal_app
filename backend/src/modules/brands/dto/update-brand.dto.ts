import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBrandDto {
  @ApiPropertyOptional({
    description: 'Brand name',
    example: 'Updated Brand Name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Brand email',
    example: 'updated@mybrand.com',
  })
  email?: string | null;

  @ApiPropertyOptional({
    description: 'Brand address',
    example: '456 Updated St, City, Country',
  })
  address?: string | null;

  @ApiPropertyOptional({
    description: 'Brand phone number',
    example: '+1-234-567-8901',
  })
  phone?: string | null;

  @ApiPropertyOptional({
    description: 'Brand picture URL',
    example: 'https://example.com/updated-logo.png',
  })
  picUrl?: string | null;

  @ApiPropertyOptional({
    description: 'Brand status',
    example: 'inactive',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Brand code',
    example: 'BRAND002',
  })
  brandCode?: string | null;

  @ApiPropertyOptional({
    description: 'Brand balance',
    example: 1500.75,
  })
  brandBalance?: number | null;
}
