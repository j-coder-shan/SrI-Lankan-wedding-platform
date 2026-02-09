import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '../types/auth'; // Ensure these types exist
import { authService } from '../services/authService';

/**
 * Interface defining the shape of the authentication context.
 * Includes user data, authentication status, and methods for login/register/logout.
 */
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component that wraps the application and makes auth state available to any child component.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for an existing logged-in user when the component mounts
    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // Handle user login
    const login = async (credentials: LoginRequest) => {
        await authService.login(credentials);
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    };

    // Handle user registration
    const register = async (data: RegisterRequest) => {
        await authService.register(data);
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    };

    // Handle logout
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user, // Derived boolean state
            login,
            register,
            logout,
            loading
        }}>
            {/* Render children only after loading checks are complete to prevent redirects/flashes */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access the authentication context.
 * Throws an error if used outside of an AuthProvider.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
