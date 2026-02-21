"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import toast from "react-hot-toast";

export default function LoginPage() {
    const { login } = useAuth();
    const [userType, setUserType] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const loadingToast = toast.loading("Signing in...");
        try {
            await login(formData.email, formData.password, userType);
            toast.success("Welcome back!", { id: loadingToast });
            if (redirectUrl) {
                router.push(redirectUrl);
            }
            // If no redirectUrl, AuthContext login function handles default redirection
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16">
                <div className="max-w-sm mx-auto w-full">
                    <Link href="/" className="text-xl font-bold text-primary-500 mb-6 block">
                        NukkadSeva
                    </Link>

                    {/* Role Tabs */}
                    <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => setUserType("CUSTOMER")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${userType === "CUSTOMER" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setUserType("PROVIDER")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${userType === "PROVIDER" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Provider
                        </button>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 mb-1">
                        {userType === "CUSTOMER" ? "Customer Login" : "Provider Login"}
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">Enter your {userType.toLowerCase()} credentials</p>

                    {error && (
                        <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder={userType === "CUSTOMER" ? "user@homefix.com" : "provider@homefix.com"}
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-primary-500 hover:text-primary-600">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <hr className="border-slate-200" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">or</span>
                    </div>

                    <button className="w-full flex items-center justify-center border border-slate-300 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
                        Continue with Google
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link href={userType === "CUSTOMER" ? "/signup" : "/provider/onboarding"} className="text-primary-600 font-bold hover:underline">
                                Sign up as {userType === "CUSTOMER" ? "Customer" : "Provider"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center p-12">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        {userType === "CUSTOMER" ? "Find Local Services" : "Grow Your Business"}
                    </h2>
                    <p className="text-primary-100 text-lg max-w-md">
                        {userType === "CUSTOMER"
                            ? "Connect with verified professionals for all your home service needs."
                            : "Reach more customers and manage your bookings efficiently."}
                    </p>
                </div>
            </div>
        </div>
    );
}
