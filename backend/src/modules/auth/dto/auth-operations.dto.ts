import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'oldPassword123',
  })
  currentPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPassword123',
  })
  newPassword: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address to send reset instructions',
    example: 'user@example.com',
  })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password reset token',
    example: 'reset-token-123',
  })
  token: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPassword123',
  })
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh-token-123',
  })
  refreshToken: string;
}
