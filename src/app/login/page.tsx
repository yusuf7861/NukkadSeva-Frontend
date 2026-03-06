"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function LoginPage() {
    const { login, googleLogin } = useAuth();
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
            await login(formData.email, formData.password);
            toast.success("Welcome back!", { id: loadingToast });
            if (redirectUrl) {
                router.push(redirectUrl);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        if (!credentialResponse.credential) {
            toast.error("Google sign-in failed. Please try again.");
            return;
        }
        const loadingToast = toast.loading("Signing in with Google...");
        try {
            await googleLogin(credentialResponse.credential);
            toast.success("Welcome!", { id: loadingToast });
            if (redirectUrl) {
                router.push(redirectUrl);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Google sign-in failed. Please try again.";
            toast.error(errorMessage, { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen flex font-sans overflow-hidden bg-white">
            {/* Left Panel - Form Container */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 overflow-y-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-md mx-auto w-full"
                >
                    <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
                        <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
                            <Image src="/brand-logo.png" alt="NukkadSeva" width={32} height={32} className="object-contain" />
                        </div>
                        <Image src="/brand-text.png" alt="NukkadSeva" width={130} height={36} className="h-7 w-auto object-contain" />
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                            Welcome back.
                        </h1>
                        <p className="text-base text-gray-500 font-medium pb-2">
                            Sign in to access your account. We&apos;ll take you to the right dashboard automatically.
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3"
                        >
                            <span className="material-symbols-outlined shrink-0">error</span>
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@email.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-semibold text-gray-700">Password</label>
                                <Link href="/forgot-password" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all tracking-wider"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Authenticating...
                                    </span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => toast.error("Google sign-in failed. Please try again.")}
                            size="large"
                            shape="rectangular"
                            width="400"
                            text="continue_with"
                        />
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="text-center bg-gray-50/50 py-4 rounded-xl border border-gray-100/50">
                            <p className="text-sm font-medium text-gray-600">
                                New customer?{" "}
                                <Link href="/signup" className="text-primary-600 font-bold hover:text-primary-700 underline underline-offset-4 decoration-2 decoration-primary-200 hover:decoration-primary-600 transition-all">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                        <div className="text-center bg-gray-50/50 py-4 rounded-xl border border-gray-100/50">
                            <p className="text-sm font-medium text-gray-600">
                                Want to offer services?{" "}
                                <Link href="/provider/onboarding" className="text-primary-600 font-bold hover:text-primary-700 underline underline-offset-4 decoration-2 decoration-primary-200 hover:decoration-primary-600 transition-all">
                                    Register as Provider
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Panel - Decorative Branding Cover */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop"
                        alt="Background Home Maintenance"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-primary-900/80 to-primary-600/60"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-white/30 relative z-10">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight relative z-10">
                            One login,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">every service.</span>
                        </h2>
                        <p className="text-lg text-primary-100/90 leading-relaxed font-medium relative z-10">
                            Whether you&apos;re booking a service or managing your business — sign in once and we&apos;ll route you to the right dashboard automatically.
                        </p>

                        <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8 relative z-10">
                            <div className="flex -space-x-3">
                                <Image width={40} height={40} className="rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                                <Image width={40} height={40} className="rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                <Image width={40} height={40} className="rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
                            </div>
                            <div className="text-sm font-medium text-white max-w-[150px]">
                                Rated <span className="text-cyan-300 font-bold">4.8/5</span> by over 10k users
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
