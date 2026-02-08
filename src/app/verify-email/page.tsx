"use client";

import Link from "next/link";

export default function VerifyEmailPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-500 p-1.5 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HomeFix</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Step 2 of 3</span>
                        <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="bg-primary-500 w-2/3 h-full rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-10">
                    {/* Icon & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-full mb-6">
                            <span className="material-symbols-outlined text-primary-500 text-3xl">mark_email_read</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verify your email</h1>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                            We've sent a 4-digit verification code to <br />
                            <span className="font-semibold text-slate-900 dark:text-slate-200">alex.smith@gmail.com</span>
                        </p>
                    </div>

                    {/* Verification Form */}
                    <form action="#" className="space-y-8" method="POST">
                        <div className="flex justify-center gap-4">
                            {/* OTP Inputs (Mocked interactive) */}
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    className="w-16 h-20 text-center text-3xl font-bold rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary-500 focus:ring-0 dark:focus:border-primary-500 transition-all text-slate-900 dark:text-white outline-none"
                                    maxLength={1}
                                    type="number"
                                />
                            ))}
                        </div>
                        <div className="space-y-4">
                            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg transition-colors shadow-md shadow-primary-500/20 flex items-center justify-center gap-2" type="submit">
                                Verify & Complete
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <div className="flex flex-col items-center gap-4 pt-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Didn't receive a code?</span>
                                    <button className="text-primary-500 font-semibold hover:underline flex items-center gap-1" type="button">
                                        Resend in <span className="font-mono">00:45</span>
                                    </button>
                                </div>
                                <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors flex items-center gap-1" type="button">
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                    Change Email
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer Information */}
            <footer className="w-full py-8 text-center text-slate-400 dark:text-slate-600 text-xs">
                <p>© 2024 HomeFix Marketplace. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4">
                    <Link href="/help" className="hover:text-primary-500 transition-colors">Help Center</Link>
                    <Link href="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
                    <Link href="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
                </div>
            </footer>
        </div>
    );
}
