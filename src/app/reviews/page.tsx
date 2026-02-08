"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleRating = (rate: number) => {
        setRating(rate);
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
            {/* Background Mock (Blurred behind modal) */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none hidden md:flex flex-col">
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-slate-900 filter blur-[2px]">
                    <div className="flex items-center gap-4">
                        <div className="size-4 bg-slate-300 rounded-full"></div>
                        <h2 className="text-lg font-bold">HomeFix Marketplace</h2>
                    </div>
                </header>
                <main className="p-10 filter blur-[2px]">
                    <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6"></div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                </main>
            </div>

            {/* Modal Overlay / Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4 bg-black/40 backdrop-blur-sm">
                {/* Modal Container */}
                <div className="bg-white dark:bg-slate-900 w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    {/* Header Section */}
                    <div className="relative px-8 pt-8 pb-4 text-center">
                        <Link href="/bookings" className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </Link>
                        <div className="inline-flex items-center justify-center size-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 border-4 border-white dark:border-slate-900 shadow-sm overflow-hidden">
                            {/* Placeholder generic avatar */}
                            <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Rate your service with John Doe</h2>
                        <p className="text-primary-500 font-semibold text-sm uppercase tracking-wider mt-1">Electrician</p>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pb-8 space-y-8">
                        {/* Star Rating */}
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-slate-600 dark:text-slate-400 font-medium">How would you rate the quality of work?</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        onClick={() => handleRating(star)}
                                        className="text-slate-300 hover:text-primary-500 transition-colors group focus:outline-none"
                                    >
                                        <span
                                            className={`material-symbols-outlined !text-4xl transition-colors ${(hoveredRating || rating) >= star ? 'text-yellow-400' : 'text-slate-300'
                                                }`}
                                            style={{ fontVariationSettings: `'FILL' ${(hoveredRating || rating) >= star ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
                                        >
                                            star
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Chips */}
                        <div className="space-y-3">
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">What went well?</p>
                            <div className="flex flex-wrap gap-2">
                                {["Punctual", "Professional", "Clean work", "Expert", "Fair Price"].map((chip) => (
                                    <button
                                        key={chip}
                                        className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:text-primary-500 text-slate-600 dark:text-slate-300 text-sm font-medium transition-all"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Review */}
                        <div className="space-y-3">
                            <label className="text-slate-600 dark:text-slate-400 text-sm font-medium" htmlFor="review">Write a review (optional)</label>
                            <textarea
                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none p-4 transition-all outline-none"
                                id="review"
                                placeholder="Tell us more about your experience..."
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col gap-3 pt-2">
                            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary-500/20">
                                Submit Review
                            </button>
                            <Link href="/bookings" className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium py-2 rounded-lg transition-all text-center">
                                Skip for now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
