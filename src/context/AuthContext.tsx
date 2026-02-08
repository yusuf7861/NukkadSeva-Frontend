"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/api";
import { User, CustomerProfile } from "@/types/backend";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, role?: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
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
            // DUMMY LOGIN LOGIC
            if (email === "admin@homefix.com") {
                if (role && role !== "ADMIN") {
                    throw new Error("Invalid role for this login portal");
                }
                const dummyAdmin: User = {
                    id: "admin-123",
                    username: "Admin User",
                    name: "Admin User",
                    email: "admin@homefix.com",
                    role: "ADMIN",
                    createdAt: new Date().toISOString()
                };
                setUser(dummyAdmin);
                router.push("/admin/dashboard");
                return;
            }

            if (email === "provider@homefix.com") {
                if (role && role !== "PROVIDER") {
                    throw new Error("Invalid role for this login portal");
                }
                const dummyProvider: User = {
                    id: "provider-123",
                    username: "John Doe",
                    name: "John Doe",
                    email: "provider@homefix.com",
                    role: "PROVIDER",
                    createdAt: new Date().toISOString(),
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxuYL3j-TpdmpM2DjIohYVsS0jpy4jD31NAwFZ6EEyYbQUOvDw_K051Ko2D5MTG64cyPonMmGmHip9yMKnwSwljSAi0zdVMFMhsSfO9qiV9vkSH3oRATQpnW-ut8a1mvFKlOyO0VYyVRsXw6xcOZWISpIkSZMJb8tAPJEHxugD_nYHxcPiFOewed7MjkIMLeKaV6ko5H4OuzrSbeDilnS_7_4KfyDMKF6qPOgi8C3MYTj6iVPgLo0wyVxPTkPawm2XN416BdrxnL-O"
                };
                setUser(dummyProvider);
                router.push("/provider/dashboard");
                return;
            }

            if (email === "user@homefix.com") {
                if (role && role !== "CUSTOMER") {
                    throw new Error("Invalid role for this login portal");
                }
                const dummyUser: User = {
                    id: "customer-123",
                    username: "Alex Smith",
                    name: "Alex Smith",
                    email: "user@homefix.com",
                    role: "CUSTOMER",
                    createdAt: new Date().toISOString(),
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2W5WEVkAMXqD_Z5GHnYqMB9Dqn-MimBAwwbaUnnrPdgNGf04AsIOs6Weysq7GhPfMrla415tjX_RJ2or03CcUZ5uM_UnIUUlWdgGw347SHQVLczId2KdxQOaIHEbT45T3-oNMAaPm7FntN8ZfRXg3J7sLc42d1NM3-0mNiasywV3PtP4IPBzf9H-7bJ-DXGQZVuZ4Mt0xyxB0OrPqHCB1RtKQeXVWQdbqoTL9bSKm_I0kXANZ_B3eBI6dWhjs5-BeAGDLvVr4E77Z"
                };
                setUser(dummyUser);
                router.push("/customer/dashboard");
                return;
            }

            const { data } = await api.post<User>("/login", { email, password });
            let userData: User = { ...data };

            if (data.role === "CUSTOMER" || data.role === "USER") {
                try {
                    const { data: profile } = await api.get<CustomerProfile>("/customer/profile");
                    userData = {
                        ...userData,
                        name: profile.name || data.username,
                        email: profile.email || data.username,
                        avatar: profile.profilePicture
                    };
                } catch (e) {
                    console.warn("Failed to fetch customer profile", e);
                }
            }

            if (role && userData.role !== role) {
                throw new Error("Invalid role for this login portal");
            }

            setUser(userData);

            // Redirect based on role
            if (userData.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else if (userData.role === "PROVIDER") {
                router.push("/provider/dashboard");
            } else {
                router.push("/customer/dashboard");
            }

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
            if (!user && (pathname.startsWith("/customer") || pathname.startsWith("/admin") || pathname.startsWith("/provider"))) {
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
