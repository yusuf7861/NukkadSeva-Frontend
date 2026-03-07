"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import api from "@/lib/api";
import { ReviewResponseDto } from "@/types/backend";

export default function ProviderReviewsPage() {
    const router = useRouter();
    const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    router.push("/auth/login");
                    return;
                }

                const res = await api.get("/reviews/provider");

                const data = res.data;
                const fetchedReviews = Array.isArray(data) ? data : [];
                setReviews(fetchedReviews);

                // Calculate average rating
                if (fetchedReviews.length > 0) {
                    const total = fetchedReviews.reduce((sum: number, r: ReviewResponseDto) => sum + r.rating, 0);
                    setAverageRating(Number((total / fetchedReviews.length).toFixed(1)));
                }

            } catch (err: any) {
                console.error("Error fetching reviews:", err);
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [router]);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
        return `${Math.floor(diffInSeconds / 31536000)}y ago`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <ProviderSidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Customer Reviews</h1>
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden w-full max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                            {error}
                        </div>
                    ) : (
                        <>
                            {/* Summary Header */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Rating Summary</h2>
                                    <p className="text-gray-500">Based on {reviews.length} customer reviews</p>
                                </div>
                                <div className="text-center bg-gray-50 px-8 py-4 rounded-xl border border-gray-100 flex flex-col items-center">
                                    <div className="flex items-end gap-1 mb-1">
                                        <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                                        <span className="text-xl font-bold text-gray-400 mb-1">/ 5</span>
                                    </div>
                                    <div className="flex gap-1 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: i < Math.round(averageRating) ? "'FILL' 1" : "'FILL' 0" }}>
                                                star
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {reviews.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
                                    <div className="size-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-4xl text-amber-400">rate_review</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
                                    <p className="text-gray-500 max-w-sm mb-6">
                                        Deliver great service to your customers and ask them to leave a review! Reviews will appear here.
                                    </p>
                                    <Link
                                        href="/provider/dashboard"
                                        className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Back to Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex gap-1 text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs font-semibold text-gray-400">{getTimeAgo(review.createdAt)}</span>
                                            </div>

                                            <p className="text-gray-700 text-sm flex-1 italic relative z-10">
                                                <span className="text-4xl text-gray-200 absolute -top-4 -left-2 -z-10 select-none">"</span>
                                                {review.comment || "Left a rating."}
                                                {review.comment && <span className="text-4xl text-gray-200 absolute -bottom-6 ml-1 -z-10 select-none">"</span>}
                                            </p>

                                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                                                <div className="size-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold shadow-inner">
                                                    {review.customerName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{review.customerName}</p>
                                                    <p className="text-xs text-gray-500">Verified Customer</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
