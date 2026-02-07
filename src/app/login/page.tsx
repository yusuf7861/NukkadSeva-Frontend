"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
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

                    {/* Tabs */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {activeTab === "login" ? (
                        <>
                            <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
                            <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="••••••••"
                                            required
                                            className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2 rounded" />
                                        <span className="text-gray-600">Remember me</span>
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
                                <hr className="border-gray-200" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400">or</span>
                            </div>

                            <button className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
                                Continue with Google
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold text-gray-900 mb-1">Create account</h1>
                            <p className="text-sm text-gray-500 mb-6">Get started with NukkadSeva</p>
                            <Link href="/signup" className="block w-full bg-primary-500 text-white py-2.5 rounded-lg text-sm font-medium text-center hover:bg-primary-600 transition-colors">
                                Continue to Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center p-12">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">Find Local Services</h2>
                    <p className="text-primary-100 text-sm max-w-sm">Connect with verified professionals for all your home service needs</p>
                </div>
            </div>
        </div>
    );
}
