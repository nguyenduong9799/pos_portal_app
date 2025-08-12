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