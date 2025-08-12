export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  token: string;
  newPassword: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}