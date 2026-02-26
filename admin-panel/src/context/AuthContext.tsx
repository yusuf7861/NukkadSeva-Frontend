"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";

interface DecodedToken {
    sub: string;
    role: string;
    user_id: number;
    exp: number;
}

interface AdminUser {
    email: string;
    token: string;
    id: number;
}

interface AuthContextType {
    user: AdminUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                if (decoded.exp * 1000 > Date.now() && decoded.role === "ADMIN") {
                    setUser({ email: decoded.sub, token, id: decoded.user_id });
                } else {
                    localStorage.removeItem("admin_token");
                }
            } catch {
                localStorage.removeItem("admin_token");
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const isLoginPage = pathname === "/login";
            if (!user && !isLoginPage) {
                router.push("/login");
            }
            if (user && isLoginPage) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = async (email: string, password: string) => {
        const { data } = await api.post("/login", { email, password });
        const token = data.access_token;
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.role !== "ADMIN") {
            throw new Error("Access denied. Admin credentials required.");
        }

        localStorage.setItem("admin_token", token);
        setUser({ email: decoded.sub, token, id: decoded.user_id });
        router.push("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
