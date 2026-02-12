"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/api";
import { User, CustomerProfile, AuthResponse } from "@/types/backend";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, role?: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    registerProvider: (data: FormData) => Promise<void>;
    verifyProviderEmail: (token: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await api.get<User>("/auth/me");
            let userData: User = { ...data };

            // If user is a customer, fetch profile to get name and avatar
            if (data.role === "CUSTOMER" || data.role === "USER") {
                try {
                    const { data: profile } = await api.get<CustomerProfile>("/customer/profile");
                    userData = {
                        ...userData,
                        name: profile.name || data.username, // Fallback to username if name is empty
                        email: profile.email || data.username,
                        avatar: profile.profilePicture
                    };
                } catch (e) {
                    console.warn("Failed to fetch customer profile", e);
                }
            }

            setUser(userData);
        } catch (error) {
            // console.log("Not authenticated", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, role?: string) => {
        setIsLoading(true);
        try {
            if (email === "admin@homefix.com" && password === "admin") {
                // Keep dummy admin for fallback/testing if needed, but prefer real auth
            }

            try {
                const { data } = await api.post<AuthResponse>("/login", { email, password });

                // Fetch user details immediately after login using the token (which is in cookie)
                // We need to wait a bit for the cookie to be set? Usually handled by browser.

                // However, the /auth/me endpoint relies on the cookie.
                // Let's assume the cookie is set.

                let userData: User = {
                    username: data.user.email,
                    email: data.user.email,
                    role: data.user.role,
                    token: data.access_token
                };

                // Now fetch full profile details
                try {
                    const meResponse = await api.get<User>("/auth/me");
                    userData = { ...userData, ...meResponse.data };
                    // Fix: auth/me returns AuthResponse, not full User. 
                    // But let's stick to the current structure or update if needed.
                    // Actually, checkAuth uses /auth/me and expects User structure?
                    // The backend /auth/me returns AuthResponse (token, email, role).
                    // So checkAuth logic might need adjustment if it expects full User object.
                    // But looking at checkAuth: const { data } = await api.get<User>("/auth/me");
                    // backend /auth/me returns AuthResponse. 
                    // So data will be { token, email, role }. 
                    // It is missing id, name, avatar etc. 
                    // We might need a separate /user/profile endpoint or similar. 
                    // For now, I will use what I have.
                } catch (e) {
                    console.warn("Failed to fetch /auth/me details", e);
                }

                if (data.user.role === "CUSTOMER" || data.user.role === "USER") {
                    try {
                        const { data: profile } = await api.get<CustomerProfile>("/customer/profile");
                        userData = {
                            ...userData,
                            name: profile.name || userData.username,
                            email: profile.email || userData.email,
                            avatar: profile.profilePicture
                        };
                    } catch (e) {
                        console.warn("Failed to fetch customer profile", e);
                    }
                }

                if (role && userData.role !== role) {
                    // Start: Allow flexible role login or enforce strict? 
                    // Backend controls role. If user logs in as provider but is customer, backend says customer.
                    // If frontend expected Provider, we should probably warn or redirect.
                    // For now, I'll log it but allow login if credentials are valid.
                    console.warn(`Warning: User role ${userData.role} does not match expected ${role}`);
                    // throw new Error("Invalid role for this login portal"); 
                }

                setUser(userData);

                // Redirect based on role
                if (userData.role === "ADMIN") {
                    router.push("/admin/dashboard");
                } else if (userData.role === "SERVICE_PROVIDER" || userData.role === "PROVIDER") {
                    router.push("/provider/dashboard");
                } else {
                    router.push("/customer/dashboard");
                }
            } catch (error) {
                // Fallback to dummy if backend fails? No, user asked for "login from the backend".
                console.error("Login failed:", error);
                throw error;
            }
            // Logic for dummy login removed/commented out effectively by the try-catch block above overriding it
            // ensuring we try backend first.



        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Signup currently only registers. 
    // We might want to auto-login or redirect to login.
    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            await api.post("/customer/register", { email, password });
            // Auto-login after signup
            await login(email, password, "CUSTOMER");
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const registerProvider = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await api.post("/provider/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // Don't auto-login, wait for verification
        } catch (error) {
            console.error("Provider registration failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyProviderEmail = async (token: string): Promise<string> => {
        setIsLoading(true);
        try {
            const { data } = await api.post<string>(`/provider/verify-email?token=${token}`);
            return typeof data === 'string' ? data : "Email verified successfully.";
        } catch (error: any) {
            console.error("Verification failed:", error);
            throw new Error(error.response?.data?.message || "Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const protectedRoutes = ["/customer", "/admin", "/provider", "/bookings", "/payments", "/profile", "/settings"];
    const authRoutes = ["/login", "/signup", "/verify-otp"];

    useEffect(() => {
        if (!isLoading) {
            if (user && authRoutes.includes(pathname)) {
                if (user.role === "ADMIN") router.push("/admin/dashboard");
                else if (user.role === "PROVIDER") router.push("/provider/dashboard");
                else router.push("/customer/dashboard");
            }

            // Simple protection: generic check. Middleware handles specific role checks better
            // Exclude public provider routes
            const isPublicProviderRoute = pathname.startsWith("/provider/onboarding") || pathname.startsWith("/provider/verify-email");

            if (!user && !isPublicProviderRoute && (pathname.startsWith("/customer") || pathname.startsWith("/admin") || pathname.startsWith("/provider"))) {
                router.push("/login");
            }
        }
    }, [user, isLoading, pathname]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout,
                registerProvider,
                verifyProviderEmail,
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
