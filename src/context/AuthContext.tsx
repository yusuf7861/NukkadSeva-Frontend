"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import { User, CustomerProfile, AuthResponse, DecodedToken, CustomerProfileResponse } from "@/types/backend";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, role?: string, shouldRedirect?: boolean) => Promise<User | null>;
    signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
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
            // Check for token in localStorage
            const token = localStorage.getItem("access_token");
            if (!token) {

                setUser(null);
                setIsLoading(false);
                return;
            }


            const decoded = jwtDecode<DecodedToken>(token);

            // Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {

                localStorage.removeItem("access_token");
                document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                setUser(null);
                setIsLoading(false);
                return;
            }



            let userData: User = {
                username: decoded.sub,
                email: decoded.sub,
                role: decoded.role,
                token: token,
                id: decoded.user_id,
            };

            // If user is a customer, fetch profile to get name and avatar
            if (decoded.role === "CUSTOMER" || decoded.role === "USER") {
                try {

                    const { data: profile } = await api.get<CustomerProfileResponse>("/customer/profile");

                    userData = {
                        ...userData,
                        name: profile.fullName || userData.username,
                        email: profile.email || userData.email,
                        avatar: profile.photograph
                    };
                } catch (e) {
                    console.warn("Failed to fetch customer profile", e);
                }
            }


            setUser(userData);
        } catch (error) {
            console.error("Auth check failed", error);
            localStorage.removeItem("access_token");
            document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setUser(null);
        } finally {

            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, role?: string, shouldRedirect: boolean = true) => {
        setIsLoading(true);
        try {
            const { data } = await api.post<AuthResponse>("/login", { email, password });

            localStorage.setItem("access_token", data.access_token);
            const isSecureContext = typeof window !== "undefined" && window.location.protocol === "https:";
            const secureFlag = isSecureContext ? "; Secure" : "";
            document.cookie = `access_token=${data.access_token}; path=/; max-age=604800; SameSite=Lax${secureFlag}`;

            const decoded = jwtDecode<DecodedToken>(data.access_token);

            let userData: User = {
                username: decoded.sub,
                email: decoded.sub,
                role: decoded.role,
                token: data.access_token,
                id: decoded.user_id,
            };

            // Fetch full profile details
            try {
                if (decoded.role === "CUSTOMER" || decoded.role === "USER") {
                    const { data: profile } = await api.get<CustomerProfile>("/customer/profile");
                    userData = {
                        ...userData,
                        name: profile.name || userData.username,
                        email: profile.email || userData.email,
                        avatar: profile.profilePicture
                    };
                }
            } catch (e) {
                console.warn("Failed to fetch customer profile", e);
            }

            if (role && userData.role !== role) {
                console.warn(`Warning: User role ${userData.role} does not match expected ${role}`);
            }

            setUser(userData);

            if (shouldRedirect) {
                if (userData.role === "ADMIN") {
                    router.push("/admin/dashboard");
                } else if (userData.role === "SERVICE_PROVIDER" || userData.role === "PROVIDER") {
                    router.push("/provider/dashboard");
                } else {
                    router.push("/customer/dashboard");
                }
            }
            setIsLoading(false);

            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            setIsLoading(false);
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string, phone: string) => {
        setIsLoading(true);
        try {
            // 1. Register User (Now includes full name and mobile number)
            await api.post("/customer/register", {
                email,
                password,
                fullName: name,
                mobileNumber: phone
            });

            // 2. Login to get token (without redirecting yet)
            const userData = await login(email, password, undefined, false);

            if (!userData) {
                throw new Error("Auto-login failed after registration");
            }

            // 5. Redirect based on role
            if (userData.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else if (userData.role === "SERVICE_PROVIDER" || userData.role === "PROVIDER") {
                router.push("/provider/dashboard");
            } else {
                router.push("/customer/dashboard");
            }

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
            await api.post("/provider/register", formData);
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
            localStorage.removeItem("access_token");
            document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if logout fails server-side, clear client state
            localStorage.removeItem("access_token");
            document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setUser(null);
            router.push("/login");
        }
    };

    const protectedRoutes = ["/customer", "/admin", "/provider", "/bookings", "/payments", "/profile", "/settings"];
    const authRoutes = ["/login", "/signup", "/verify-otp"];

    useEffect(() => {
        // Only run protection logic if auth check is complete

        if (!isLoading) {
            const isAuthRoute = authRoutes.includes(pathname);
            const isPublicProviderRoute = pathname.startsWith("/provider/onboarding") || pathname.startsWith("/provider/verify-email");
            const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

            if (user && isAuthRoute) {
                // User is logged in but trying to access login/signup page - redirect to dashboard

                if (user.role === "ADMIN") {
                    router.push("/admin/dashboard");
                } else if (user.role === "SERVICE_PROVIDER" || user.role === "PROVIDER") {
                    router.push("/provider/dashboard");
                } else {
                    router.push("/customer/dashboard");
                }
            } else if (!user && isProtectedRoute && !isPublicProviderRoute) {
                // User is not logged in and trying to access protected route - redirect to login

                router.push("/login");
            }
        }
    }, [user, isLoading, pathname, router]);

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
            {isLoading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading...</p>
                    </div>
                </div>
            ) : (
                children
            )}
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
