"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useBookingSocket, BookingNotification } from "@/hooks/useBookingSocket";
import { ProviderDashboardResponse } from "@/types/backend";

export default function ProviderDashboard() {
    const { user } = useAuth();
    const token = user?.token || null;
    const { isConnected, newBookings, removeBooking } = useBookingSocket(token);

    const [dashboardData, setDashboardData] = useState<ProviderDashboardResponse | null>(null);
    const [pendingBookings, setPendingBookings] = useState<BookingNotification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [respondingId, setRespondingId] = useState<string | null>(null);

    // Fetch existing dashboard on mount
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get<ProviderDashboardResponse>("/provider/dashboard");
                setDashboardData(res.data);

                // Map the backend DTO to the BookingNotification interface for the feed
                const mappedPending = res.data.pendingBookings.map((b) => ({
                    bookingId: b.bookingId,
                    customerName: b.customerName,
                    serviceType: b.serviceType,
                    bookingDateTime: b.bookingDateTime,
                    priceEstimate: b.priceEstimate,
                    note: b.note,
                    status: b.status,
                    createdAt: b.createdAt,
                }));
                setPendingBookings(mappedPending);
            } catch (err) {
                console.error("Failed to fetch dashboard:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    // Merge real-time bookings into the list and show a toast
    useEffect(() => {
        if (newBookings.length > 0) {
            const latest = newBookings[0];
            setPendingBookings((prev) => {
                // avoid duplicates
                const exists = prev.some((b) => b.bookingId === latest.bookingId);
                return exists ? prev : [latest, ...prev];
            });
            toast.success(`New booking from ${latest.customerName}!`, {
                icon: "🔔",
                duration: 5000,
            });
        }
    }, [newBookings]);

    const handleRespond = useCallback(
        async (bookingId: string, action: "ACCEPT" | "DECLINE") => {
            setRespondingId(bookingId);
            try {
                await api.put(`/booking/${bookingId}/respond?action=${action}`);
                setPendingBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
                removeBooking(bookingId);
                toast.success(
                    action === "ACCEPT"
                        ? "Booking accepted! 🎉"
                        : "Booking declined."
                );
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Failed to respond to booking.");
            } finally {
                setRespondingId(null);
            }
        },
        [removeBooking]
    );

    const formatDateTime = (iso: string) => {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return iso;
        }
    };

    const getTimeAgo = (iso: string) => {
        try {
            const now = Date.now();
            const then = new Date(iso).getTime();
            const diff = Math.floor((now - then) / 1000);
            if (diff < 60) return `${diff}s ago`;
            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
            return `${Math.floor(diff / 86400)}d ago`;
        } catch {
            return "";
        }
    };

    const serviceIcon: Record<string, string> = {
        PLUMBING: "plumbing",
        ELECTRICAL: "electrical_services",
        CARPENTRY: "carpenter",
        CLEANING: "cleaning_services",
        PAINTING: "format_paint",
        APPLIANCE_REPAIR: "build",
        PEST_CONTROL: "pest_control",
        BEAUTY_AND_WELLNESS: "spa",
        GARDENING: "yard",
        MOVING_AND_PACKING: "local_shipping",
    };

    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Top Bar */}
                <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-2 pl-12 lg:pl-0">
                        <span className="text-gray-400 text-sm hidden md:inline">Welcome back,</span>
                        <span className="font-bold text-gray-900 hidden md:inline">{user?.name || user?.username || "Provider"}</span>
                        <span className="font-bold text-gray-900 md:hidden">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Live indicator */}
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isConnected
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}>
                            <span className={`inline-block size-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                                }`} />
                            {isConnected ? "Live" : "Offline"}
                        </div>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            {pendingBookings.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 size-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                    {pendingBookings.length > 9 ? "9+" : pendingBookings.length}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-[1200px] mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Pending</span>
                                <span className="text-amber-500 material-symbols-outlined text-xl">pending_actions</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">{dashboardData?.pendingRequestsCount || pendingBookings.length || 0}</p>
                            <p className="text-amber-500 text-xs font-medium">Needs response</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Earnings</span>
                                <span className="text-primary-500 material-symbols-outlined text-xl">currency_exchange</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">₹{dashboardData?.totalEarnings?.toLocaleString("en-IN") || 0}</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Jobs Done</span>
                                <span className="text-primary-500 material-symbols-outlined text-xl">task_alt</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">{dashboardData?.completedJobs || 0}</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Rating</span>
                                <span className="text-amber-400 material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">{dashboardData?.averageRating?.toFixed(1) || "0.0"}</p>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Requests Feed */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold tracking-tight">Booking Requests</h2>
                                    {pendingBookings.length > 0 && (
                                        <span className="bg-primary-50 text-primary-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                            {pendingBookings.length} pending
                                        </span>
                                    )}
                                </div>
                                <Link href="/provider/create-service">
                                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        Create Service
                                    </button>
                                </Link>
                            </div>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className="size-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                                    <p className="text-gray-400 text-sm">Loading bookings…</p>
                                </div>
                            ) : pendingBookings.length === 0 ? (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
                                    <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">inbox</span>
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-1">No pending requests</h3>
                                    <p className="text-sm text-gray-400 max-w-xs">
                                        New booking requests will appear here in real-time when customers book your services.
                                    </p>
                                </div>
                            ) : (
                                pendingBookings.map((booking) => (
                                    <div
                                        key={booking.bookingId}
                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row animate-fade-in"
                                    >
                                        {/* Service Icon Panel */}
                                        <div className="md:w-44 h-36 md:h-auto overflow-hidden shrink-0 relative bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-5xl text-primary-400 opacity-60">
                                                {serviceIcon[booking.serviceType] || "home_repair_service"}
                                            </span>
                                            {booking.createdAt && (
                                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded px-2 py-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs text-gray-900">schedule</span>
                                                    <span className="text-[10px] font-bold text-gray-900">{getTimeAgo(booking.createdAt)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Booking Details */}
                                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {booking.serviceType.replace(/_/g, " ")}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                                                            <span className="material-symbols-outlined text-[16px]">person</span>
                                                            {booking.customerName}
                                                        </p>
                                                    </div>
                                                    <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                                                        Pending
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-[16px] text-gray-400">calendar_today</span>
                                                        {formatDateTime(booking.bookingDateTime)}
                                                    </div>
                                                    {booking.priceEstimate && (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-[16px] text-gray-400">payments</span>
                                                            ₹{Number(booking.priceEstimate).toLocaleString("en-IN")}
                                                        </div>
                                                    )}
                                                </div>

                                                {booking.note && (
                                                    <p className="text-sm text-gray-500 mt-3 bg-gray-50 p-3 rounded-lg italic">
                                                        &ldquo;{booking.note}&rdquo;
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleRespond(booking.bookingId, "ACCEPT")}
                                                    disabled={respondingId === booking.bookingId}
                                                    className="flex-1 bg-primary-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-primary-600 active:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {respondingId === booking.bookingId ? (
                                                        <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                            Accept
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleRespond(booking.bookingId, "DECLINE")}
                                                    disabled={respondingId === booking.bookingId}
                                                    className="px-5 h-10 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="flex flex-col gap-6">
                            {/* Service Area */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary-500">my_location</span>
                                    Service Area
                                </h3>
                                <div className="w-full h-48 rounded-lg bg-gray-100 mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                        <span className="material-symbols-outlined text-4xl">map</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Radius: 15 miles</span>
                                    <button className="text-primary-500 font-semibold">Edit Radius</button>
                                </div>
                            </div>

                            {/* Today's Schedule */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary-500">event_note</span>
                                    Today&apos;s Schedule
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-primary-500 rounded-full" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">10:00 AM</p>
                                            <p className="text-sm font-semibold">AC Unit Maintenance</p>
                                            <p className="text-[11px] text-gray-400 italic">Beverly Hills</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-gray-300 rounded-full" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">01:30 PM</p>
                                            <p className="text-sm font-semibold">Garage Door Repair</p>
                                            <p className="text-[11px] text-gray-400 italic">Westwood</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-gray-300 rounded-full" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">04:00 PM</p>
                                            <p className="text-sm font-semibold">Lighting Installation</p>
                                            <p className="text-[11px] text-gray-400 italic">Santa Monica</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors uppercase tracking-wider">
                                    Full Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
