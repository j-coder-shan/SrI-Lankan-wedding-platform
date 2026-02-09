export type Role = 'ROLE_COUPLE' | 'ROLE_VENDOR' | 'ROLE_ADMIN';

export interface User {
    id: number;
    email: string;
    fullName?: string;
    phone?: string;
    role: Role;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    userId: number; // Backend sends Long, Frontend uses number
    role: Role;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role: Role;
}
