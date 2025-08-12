export class LoginResponseDto {
  accessToken: string;
  refreshToken?: string;
  id: string;
  username: string;
  name: string;
  role: string;
  status: string;
  brandPicUrl?: string;
}
