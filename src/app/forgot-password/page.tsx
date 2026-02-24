"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mail, ArrowRight, Loader2 } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your registered email");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/forgot-password", { email });
            toast.success("OTP sent to your email!");
            // Redirect to reset password page with email pre-filled
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (error: any) {
            console.error("Forgot password error:", error);
            const msg = error.response?.data?.message || "Failed to initiate password reset.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex items-center justify-center text-primary-600 mb-6">
                    <span className="text-3xl font-bold tracking-tight">Nukkad<span className="text-gray-900">Seva</span></span>
                </Link>
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter the email associated with your account and we'll send an OTP to reset your password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-10 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-12 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-50 rounded-full blur-2xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50"></div>

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
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all bg-gray-50/50"
                                    placeholder="you@example.com"
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
                                        Sending OTP...
                                    </>
                                ) : (
                                    <>
                                        Send Reset OTP
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

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
