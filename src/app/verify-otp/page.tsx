"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleResend = async () => {
        setIsResending(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsResending(false);
        setCountdown(30);
        setOtp(["", "", "", "", "", ""]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        console.log("OTP:", otpValue);
        // Redirect to dashboard on success
        window.location.href = "/dashboard";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">NukkadSeva</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-primary-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-600 text-center mb-8">
                        We've sent a 6-digit verification code to your email address.
                        Please enter it below.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* OTP Input */}
                        <div className="flex justify-center gap-3 mb-8">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={otp.some((d) => !d)}
                            className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verify Email
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </form>

                    {/* Resend */}
                    <div className="text-center mt-6">
                        {countdown > 0 ? (
                            <p className="text-gray-500">
                                Resend code in{" "}
                                <span className="font-medium text-gray-900">{countdown}s</span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-primary-500 font-medium hover:text-primary-600 flex items-center justify-center mx-auto"
                            >
                                {isResending ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Resend verification code"
                                )}
                            </button>
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Wrong email?{" "}
                        <Link
                            href="/signup"
                            className="text-primary-500 font-medium hover:text-primary-600"
                        >
                            Go back
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
