import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'admin123',
  })
  password: string;
}
