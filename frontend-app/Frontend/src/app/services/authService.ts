import apiClient from '../api/client';
import { AuthResponse, LoginRequest, RegisterRequest, User, Role } from '../types/auth';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
        if (response.data.accessToken) {
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            // Backend returns minimal user info in response, store it
            const user: User = {
                id: response.data.userId,
                email: credentials.email, // Backend doesn't return email in login response unfortunately, assume context
                role: response.data.role as Role
            };
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
        if (response.data.accessToken) {
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            const user: User = {
                id: response.data.userId,
                email: data.email,
                fullName: data.fullName,
                role: response.data.role || data.role as Role
            };
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.href = '/login';
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem(TOKEN_KEY);
        return !!token; // Simple check, ideally JWT expiry check
    }
};
