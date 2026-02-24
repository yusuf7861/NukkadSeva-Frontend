"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Mail, ArrowRight, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Accept email from query parameter if it exists
    const initialEmail = searchParams.get("email") || "";

    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !otp || !newPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/reset-password", {
                email,
                otp,
                newPassword
            });
            toast.success("Password reset successful! Please log in.");
            router.push("/login");
        } catch (error: any) {
            console.error("Reset password error:", error);
            const msg = error.response?.data?.message || "Failed to reset password. Invalid OTP or Email.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6 relative" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all bg-gray-50/50"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900 flex justify-between">
                    <span>6-Digit OTP</span>
                    <span className="text-xs text-gray-500 font-normal">Check your email</span>
                </label>
                <div className="mt-2 relative">
                    <input
                        id="otp"
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 px-4 text-center text-tracking-widest font-mono text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-lg transition-all bg-gray-50/50"
                        placeholder="••••••"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                </label>
                <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all bg-gray-50/50"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Eye className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm New Password
                </label>
                <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all bg-gray-50/50"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Resetting Password...
                        </>
                    ) : (
                        <>
                            Reset Password
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex items-center justify-center text-primary-600 mb-6">
                    <span className="text-3xl font-bold tracking-tight">Nukkad<span className="text-gray-900">Seva</span></span>
                </Link>
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Set new password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter the OTP sent to your email and choose a new password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-10 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-12 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-50 rounded-full blur-2xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50"></div>

                    {/* Suspense boundary required because useSearchParams accesses the current URL */}
                    <Suspense fallback={<div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary-500" /></div>}>
                        <ResetPasswordForm />
                    </Suspense>

                    <div className="mt-10 text-center text-sm relative">
                        <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500 flex items-center justify-center gap-1">
                            <ChevronLeft className="h-4 w-4" /> Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
