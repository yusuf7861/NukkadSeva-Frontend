"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import api from "@/lib/api";
import { PastServiceItem } from "@/types/backend";

export default function ProviderPastJobsPage() {
    const router = useRouter();
    const [pastJobs, setPastJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedJobId(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        const fetchPastJobs = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    router.push("/auth/login");
                    return;
                }

                const res = await api.get("/booking/provider");

                const data: any[] = res.data;

                // Filter and sort for completed and cancelled jobs
                const historyJobs = data
                    .filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED" || b.status === "REJECTED")
                    .sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime());

                setPastJobs(historyJobs);
            } catch (err: any) {
                console.error("Error fetching past jobs:", err);
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchPastJobs();
    }, [router]);

    const formatDateTime = (dateString: string) => {
        return new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(dateString));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Component */}
            <ProviderSidebar />

            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Job History</h1>
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden w-full max-w-7xl mx-auto">
                    <div className="mb-6">
                        <p className="text-gray-500">View your past completed and cancelled service requests.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                            {error}
                        </div>
                    ) : pastJobs.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
                            <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-4xl text-gray-400">history_toggle_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No past jobs yet</h3>
                            <p className="text-gray-500 max-w-sm mb-6">
                                completed, rejected, or cancelled jobs will appear here once you have some history.
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
                        <div className="space-y-4">
                            {pastJobs.map((job) => {
                                const isExpanded = expandedJobId === job.id;
                                const customerName = job.customer?.name || "Customer";
                                const customerPhone = job.customer?.phone;
                                const customerAddress = job.customer?.address || "Address not provided";

                                return (
                                    <div
                                        key={job.id}
                                        onClick={() => toggleExpand(job.id)}
                                        className={`bg-white rounded-2xl border ${isExpanded ? 'border-primary-300 shadow-md' : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'} transition-all cursor-pointer overflow-hidden p-4 sm:p-5`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                            {/* Main Info */}
                                            <div className="flex gap-4 sm:gap-6 w-full">
                                                {/* Status Icon */}
                                                <div className="shrink-0 mt-1">
                                                    {job.status === "COMPLETED" ? (
                                                        <div className="size-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100">
                                                            <span className="material-symbols-outlined text-[20px]">task_alt</span>
                                                        </div>
                                                    ) : job.status === "CANCELLED" || job.status === "REJECTED" ? (
                                                        <div className="size-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 border border-red-100">
                                                            <span className="material-symbols-outlined text-[20px]">cancel</span>
                                                        </div>
                                                    ) : (
                                                        <div className="size-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                                                            <span className="material-symbols-outlined text-[20px]">history</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Job Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                        <div>
                                                            <h3 className="text-base font-bold text-gray-900 truncate">
                                                                {job.serviceType?.replace(/_/g, " ")}
                                                            </h3>
                                                            <p className="text-sm font-medium text-gray-600">For {customerName}</p>
                                                        </div>

                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            {job.status === "COMPLETED" && (
                                                                <>
                                                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-100 whitespace-nowrap">
                                                                        Completed
                                                                    </span>
                                                                    {job.isReviewed && (
                                                                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-100 flex items-center gap-1 whitespace-nowrap">
                                                                            <span className="material-symbols-outlined text-[14px]">star</span>
                                                                            {job.rating ? `${job.rating} Rated` : 'Reviewed'}
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                            {job.status === "CANCELLED" && (
                                                                <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider border border-red-100 whitespace-nowrap">
                                                                    Cancelled
                                                                </span>
                                                            )}
                                                            {job.status === "REJECTED" && (
                                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full uppercase tracking-wider border border-gray-200 whitespace-nowrap">
                                                                    Declined
                                                                </span>
                                                            )}
                                                            <span className="font-bold text-gray-900 text-base whitespace-nowrap">
                                                                ₹{job.priceEstimate?.toLocaleString("en-IN") || "0"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-500 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                                            <span>{formatDateTime(job.bookingDateTime)}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">location_on</span>
                                                            <span className="line-clamp-2 leading-tight">{customerAddress}</span>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Content */}
                                                    {isExpanded && (
                                                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in text-sm flex flex-col gap-4">
                                                            {customerPhone && (
                                                                <div className="flex items-center gap-2 text-gray-700">
                                                                    <span className="material-symbols-outlined text-[16px] text-primary-500">call</span>
                                                                    <span className="font-semibold">{customerPhone}</span>
                                                                </div>
                                                            )}

                                                            {job.note && (
                                                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-amber-900">
                                                                    <span className="font-semibold block mb-1">Customer Note:</span>
                                                                    <p className="leading-relaxed whitespace-pre-wrap">{job.note}</p>
                                                                </div>
                                                            )}

                                                            {job.status === "REJECTED" && job.rejectionReason && (
                                                                <div className="bg-red-50/50 rounded-lg p-3 border border-red-100 text-red-800">
                                                                    <span className="font-semibold block mb-1">Reason for Decline:</span>
                                                                    <p>{job.rejectionReason}</p>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                                                                <span>Booking ID: <span className="font-mono">{job.id}</span></span>
                                                                <span>Created: {formatDateTime(job.createdAt)}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {!isExpanded && (
                                                        <div className="mt-2 text-center">
                                                            <span className="text-xs text-primary-500 font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                                                                Click to view details
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
