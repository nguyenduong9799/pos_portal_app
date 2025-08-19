import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    description: 'Brand name',
    example: 'My Brand',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Brand email',
    example: 'contact@mybrand.com',
  })
  email?: string | null;

  @ApiPropertyOptional({
    description: 'Brand address',
    example: '123 Main St, City, Country',
  })
  address?: string | null;

  @ApiPropertyOptional({
    description: 'Brand phone number',
    example: '+1-234-567-8900',
  })
  phone?: string | null;

  @ApiPropertyOptional({
    description: 'Brand picture URL',
    example: 'https://example.com/logo.png',
  })
  picUrl?: string | null;

  @ApiProperty({
    description: 'Brand status',
    example: 'active',
  })
  status: string;

  @ApiPropertyOptional({
    description: 'Brand code',
    example: 'BRAND001',
  })
  brandCode?: string | null;

  @ApiPropertyOptional({
    description: 'Brand balance',
    example: 1000.5,
  })
  brandBalance?: number | null;
}
