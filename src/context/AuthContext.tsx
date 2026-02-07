"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/bookings", "/payments", "/profile", "/settings"];

// Routes that should redirect authenticated users
const authRoutes = ["/login", "/signup", "/verify-otp"];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check for existing session on mount
        const storedUser = localStorage.getItem("nukkadseva_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
        const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

        if (isProtectedRoute && !user) {
            router.push("/login");
        } else if (isAuthRoute && user) {
            router.push("/dashboard");
        }
    }, [user, pathname, isLoading, router]);

    const login = async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: "1",
            name: "John Doe",
            email,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        };

        setUser(mockUser);
        localStorage.setItem("nukkadseva_user", JSON.stringify(mockUser));
        router.push("/dashboard");
    };

    const signup = async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to OTP verification
        localStorage.setItem("nukkadseva_pending_email", email);
        router.push("/verify-otp");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("nukkadseva_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
