export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    id: string;
    username: string;
    name: string;
    role: string;
    status: string;
    brandPicUrl?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface User {
    id: string;
    username: string;
    name: string;
    role: string;
    status: string;
    storeId: string | null;
    storeCode: string | null;
    brandId: string | null;
    brandCode: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}