import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'JWT refresh token',
    example: 'refresh_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken?: string;

  @ApiProperty({
    description: 'User ID',
    example: 'user-uuid-123',
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Administrator',
  })
  name: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
  })
  role: string;

  @ApiProperty({
    description: 'User status',
    example: 'active',
  })
  status: string;

  @ApiPropertyOptional({
    description: 'Brand picture URL',
    example: 'https://example.com/brand-logo.png',
  })
  brandPicUrl?: string;
}
