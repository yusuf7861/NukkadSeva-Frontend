"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const sent = searchParams.get("sent");
    const { verifyProviderEmail } = useAuth();

    const [status, setStatus] = useState<"loading" | "success" | "error" | "sent">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (sent) {
            setStatus("sent");
            setMessage("A verification email has been sent to your registered email address. Please check your inbox and click the link to verify your account.");
            return;
        }

        if (token) {
            verifyEmail(token);
        } else {
            setStatus("error");
            setMessage("Invalid verification link.");
        }
    }, [token, sent]);

    const verifyEmail = async (token: string) => {
        try {
            const msg = await verifyProviderEmail(token);
            setStatus("success");
            setMessage(msg || "Email verified successfully! Your account is now pending admin approval.");
        } catch (error: any) {
            setStatus("error");
            setMessage(error.message || "Verification failed. The link might be expired or invalid.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 max-w-md w-full text-center">
            {status === "loading" && !sent && (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
                    <p className="text-gray-600">Verifying your email...</p>
                </div>
            )}

            {status === "sent" && (
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                        <span className="material-symbols-outlined text-blue-600 text-4xl">mark_email_unread</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Check your Inbox</h2>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <Link href="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                        Back to Login
                    </Link>
                </div>
            )}

            {status === "success" && (
                <div className="flex flex-col items-center">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                        <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Successful</h2>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <Link href="/login" className="inline-block px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors">
                        Go to Login
                    </Link>
                </div>
            )}

            {status === "error" && (
                <div className="flex flex-col items-center">
                    <div className="bg-red-100 p-4 rounded-full mb-4">
                        <span className="material-symbols-outlined text-red-600 text-4xl">error</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <Link href="/provider/onboarding" className="text-primary-500 hover:text-primary-600 font-semibold">
                        Back to Registration
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function ProviderVerifyEmailPage() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
