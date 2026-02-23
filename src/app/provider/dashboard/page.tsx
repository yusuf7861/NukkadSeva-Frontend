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
    const [activeBookings, setActiveBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [respondingId, setRespondingId] = useState<string | null>(null);
    const [feedTab, setFeedTab] = useState<"PENDING" | "UPCOMING">("PENDING");
    const [otpInputs, setOtpInputs] = useState<Record<string, string>>({});
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // Decline reason modal state
    const [declineBookingId, setDeclineBookingId] = useState<string | null>(null);
    const [declineReason, setDeclineReason] = useState("");

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

                // Fetch all bookings for the provider to populate Active/Upcoming ones
                const allBRes = await api.get("/booking/provider");
                const upcoming = allBRes.data.filter((b: any) => b.status === "APPROVED");
                setActiveBookings(upcoming);

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
        async (bookingId: string, action: "ACCEPT" | "DECLINE", reason?: string) => {
            setRespondingId(bookingId);
            try {
                let url = `/booking/${bookingId}/respond?action=${action}`;
                if (action === "DECLINE" && reason) {
                    url += `&reason=${encodeURIComponent(reason)}`;
                }
                await api.put(url);
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

    const handleComplete = async (bookingId: string) => {
        const otp = otpInputs[bookingId];
        if (!otp || otp.length < 4) {
            toast.error("Please enter a valid OTP");
            return;
        }
        setRespondingId(bookingId);
        try {
            await api.put(`/booking/${bookingId}/complete?otp=${otp}`);
            toast.success("Job marked as complete! 🎉");
            setActiveBookings(prev => prev.filter(b => b.id !== bookingId));
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to complete job.");
        } finally {
            setRespondingId(null);
        }
    };

    const handleOtpChange = (bookingId: string, val: string) => {
        setOtpInputs(prev => ({ ...prev, [bookingId]: val }));
    };

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

    const getTodayBookings = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return activeBookings.filter(b => {
            if (!b.bookingDateTime) return false;
            const bDate = new Date(b.bookingDateTime);
            bDate.setHours(0, 0, 0, 0);
            return bDate.getTime() === today.getTime();
        }).sort((a, b) => new Date(a.bookingDateTime).getTime() - new Date(b.bookingDateTime).getTime());
    };

    const todayBookings = getTodayBookings();

    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Top Bar */}
                <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-3 md:px-4 lg:px-8">
                    <div className="flex items-center gap-2 pl-10 md:pl-12 lg:pl-0 min-w-0">
                        <span className="text-gray-400 text-sm hidden md:inline truncate">Welcome back,</span>
                        <span className="font-bold text-gray-900 hidden md:inline truncate">{user?.name || user?.username || "Provider"}</span>
                        <span className="font-bold text-gray-900 md:hidden truncate">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Live indicator */}
                        <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isConnected
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}>
                            <span className={`inline-block size-2 shrink-0 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                                }`} />
                            <span className="hidden sm:inline">{isConnected ? "Live" : "Offline"}</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                            >
                                <span className="material-symbols-outlined">notifications</span>
                                {pendingBookings.length > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 size-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                        {pendingBookings.length > 9 ? "9+" : pendingBookings.length}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-32px)] bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-fade-in origin-top-right">
                                    <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                                        <span className="text-xs text-primary-600 font-semibold">{pendingBookings.length} New</span>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto">
                                        {pendingBookings.length === 0 ? (
                                            <div className="p-8 text-center flex flex-col items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-300 text-3xl">notifications_paused</span>
                                                <p className="text-sm text-gray-500">You're all caught up!</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                {pendingBookings.map((b) => (
                                                    <div
                                                        key={b.bookingId}
                                                        onClick={() => {
                                                            setFeedTab("PENDING");
                                                            setIsNotificationsOpen(false);
                                                            document.getElementById(b.bookingId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                        }}
                                                        className="p-3 border-b border-gray-50 hover:bg-primary-50/50 cursor-pointer transition-colors flex gap-3 items-start"
                                                    >
                                                        <div className="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                                                            <span className="material-symbols-outlined text-[16px]">person</span>
                                                        </div>
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <span className="text-sm font-bold text-gray-900 truncate">{b.customerName}</span>
                                                                <span className="text-[10px] font-semibold text-primary-600 shrink-0">{getTimeAgo(b.createdAt)}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                                                Requested <span className="font-semibold text-gray-900">{b.serviceType.replace(/_/g, " ")}</span> service.
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {pendingBookings.length > 0 && (
                                        <div
                                            onClick={() => { setFeedTab("PENDING"); setIsNotificationsOpen(false); }}
                                            className="p-2 border-t border-gray-100 text-center text-xs font-bold text-primary-600 hover:bg-gray-50 cursor-pointer transition-colors uppercase tracking-wider"
                                        >
                                            View all pending
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
                            <p className="text-2xl font-bold tracking-tight">{pendingBookings.length}</p>
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
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold tracking-tight">Jobs</h2>
                                    <div className="flex bg-gray-100 rounded-lg p-1 ml-2">
                                        <button
                                            onClick={() => setFeedTab("PENDING")}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${feedTab === "PENDING" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            Pending {pendingBookings.length > 0 && `(${pendingBookings.length})`}
                                        </button>
                                        <button
                                            onClick={() => setFeedTab("UPCOMING")}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${feedTab === "UPCOMING" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            Upcoming {activeBookings.length > 0 && `(${activeBookings.length})`}
                                        </button>
                                    </div>
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
                            ) : feedTab === "PENDING" && pendingBookings.length === 0 ? (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
                                    <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">inbox</span>
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-1">No pending requests</h3>
                                    <p className="text-sm text-gray-400 max-w-xs">
                                        New booking requests will appear here in real-time.
                                    </p>
                                </div>
                            ) : feedTab === "UPCOMING" && activeBookings.length === 0 ? (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
                                    <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">event_available</span>
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-1">No upcoming jobs</h3>
                                    <p className="text-sm text-gray-400 max-w-xs">
                                        Accept booking requests to see your upcoming schedule here.
                                    </p>
                                </div>
                            ) : (
                                (feedTab === "PENDING" ? pendingBookings : activeBookings).map((booking) => {
                                    const isPending = feedTab === "PENDING";
                                    const bId = isPending ? booking.bookingId : booking.id;
                                    const cName = isPending ? booking.customerName : booking.customer?.name;
                                    const sType = booking.serviceType;
                                    const bDate = booking.bookingDateTime;
                                    const pEst = isPending ? booking.priceEstimate : booking.priceEstimate;

                                    return (
                                        <div
                                            key={bId}
                                            id={bId}
                                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col md:flex-row animate-fade-in"
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
                                                                {sType.replace(/_/g, " ")}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                                                                <span className="material-symbols-outlined text-[16px]">person</span>
                                                                {cName}
                                                            </p>
                                                            {!isPending && booking.customer?.phone && (
                                                                <p className="text-sm text-primary-600 font-semibold flex items-center gap-1.5 mt-0.5">
                                                                    <span className="material-symbols-outlined text-[16px]">call</span>
                                                                    {booking.customer.phone}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${isPending ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                                                            {isPending ? "Pending" : "Upcoming"}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-[16px] text-gray-400">calendar_today</span>
                                                            {formatDateTime(bDate)}
                                                        </div>
                                                        {pEst && (
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-[16px] text-gray-400">payments</span>
                                                                ₹{Number(pEst).toLocaleString("en-IN")}
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
                                                    {isPending ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleRespond(bId, "ACCEPT")}
                                                                disabled={respondingId === bId}
                                                                className="flex-1 bg-primary-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-primary-600 active:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                                            >
                                                                {respondingId === bId ? (
                                                                    <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                                        Accept
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => setDeclineBookingId(bId)}
                                                                disabled={respondingId === bId}
                                                                className="px-5 h-10 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                                                Decline
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter OTP"
                                                                maxLength={6}
                                                                value={otpInputs[bId] || ""}
                                                                onChange={(e) => handleOtpChange(bId, e.target.value)}
                                                                className="flex-1 h-10 border border-gray-300 rounded-lg px-3 text-center tracking-widest font-mono font-bold focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                                                            />
                                                            <button
                                                                onClick={() => handleComplete(bId)}
                                                                disabled={respondingId === bId || !otpInputs[bId]}
                                                                className="bg-emerald-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-emerald-600 active:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                                            >
                                                                {respondingId === bId ? (
                                                                    <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <span className="material-symbols-outlined text-[18px]">done_all</span>
                                                                        Complete Job
                                                                    </>
                                                                )}
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                            {/* Lower Section: Recent History & Reviews */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                {/* Recent Past Services */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold tracking-tight">Recent Past Services</h2>
                                        <Link href="/provider/jobs/past" className="text-primary-600 text-sm font-semibold hover:underline">
                                            View full history
                                        </Link>
                                    </div>
                                    {dashboardData?.recentPastServices && dashboardData.recentPastServices.length > 0 ? (
                                        <div className="space-y-4">
                                            {dashboardData.recentPastServices.map((job, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                                                            <span className="material-symbols-outlined text-[20px]">task_alt</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 text-sm">{job.serviceType.replace(/_/g, " ")}</h4>
                                                            <p className="text-xs text-gray-500">{job.customerName}</p>
                                                            <p className="text-[10px] text-gray-400 mt-1">{formatDateTime(job.completedAt || job.bookingDateTime)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-900 text-sm">
                                                            {job.finalPrice ? `₹${job.finalPrice.toLocaleString("en-IN")}` : "—"}
                                                        </p>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                                                            {job.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center h-full">
                                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">history toggle_off</span>
                                            <p className="text-sm font-bold text-gray-600">No past services yet.</p>
                                            <p className="text-xs text-gray-400">Complete your first job to see history here.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Recent Reviews */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold tracking-tight">Recent Reviews</h2>
                                        <Link href="/provider/reviews" className="text-primary-600 text-sm font-semibold hover:underline">
                                            View all reviews
                                        </Link>
                                    </div>
                                    {dashboardData?.recentReviews && dashboardData.recentReviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {dashboardData.recentReviews.map((review, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex gap-1 text-amber-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>
                                                                    star
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-500">{getTimeAgo(review.createdAt)}</span>
                                                    </div>
                                                    {review.comment && (
                                                        <p className="text-sm text-gray-700 italic border-l-2 border-gray-200 pl-3 my-1">
                                                            "{review.comment}"
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="size-5 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-[12px] text-gray-500">person</span>
                                                        </div>
                                                        <p className="text-xs font-semibold text-gray-600">— {review.customerName}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center h-full">
                                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">rate_review</span>
                                            <p className="text-sm font-bold text-gray-600">No reviews yet.</p>
                                            <p className="text-xs text-gray-400">Deliver great service to earn your first review!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
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

                                {todayBookings.length === 0 ? (
                                    <div className="py-6 flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg border border-gray-100 dashed">
                                        <span className="material-symbols-outlined text-gray-300 text-3xl mb-1">free_cancellation</span>
                                        <p className="text-sm font-semibold text-gray-600">No jobs today</p>
                                        <p className="text-xs text-gray-400 mt-1">Enjoy your free time!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {todayBookings.map((job) => {
                                            const timeString = new Date(job.bookingDateTime).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                                            const address = job.customer?.address || "Location not provided";
                                            return (
                                                <div key={job.id} className="flex gap-3">
                                                    <div className="w-1 bg-primary-500 rounded-full shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500 font-bold uppercase">{timeString}</p>
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{job.serviceType.replace(/_/g, " ")}</p>
                                                        <p className="text-[11px] text-gray-400 italic truncate" title={address}>{address}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <Link href="/provider/schedule" className="block mt-6">
                                    <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors uppercase tracking-wider text-gray-700">
                                        Full Calendar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            {/* Decline Reason Modal */}
            {declineBookingId && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-scale-up">
                        <button
                            onClick={() => { setDeclineBookingId(null); setDeclineReason(""); }}
                            className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full p-1 transition"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <span className="material-symbols-outlined text-3xl">cancel</span>
                            <h3 className="text-xl font-bold text-gray-900">Decline Booking</h3>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">
                            Please provide a reason for declining this request. This helps customers understand why their booking wasn't accepted.
                        </p>

                        <textarea
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                            placeholder="I'm currently booked out for the day..."
                            className="w-full border border-gray-300 rounded-xl p-3 h-32 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none mb-4"
                        />

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => { setDeclineBookingId(null); setDeclineReason(""); }}
                                className="px-5 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleRespond(declineBookingId, "DECLINE", declineReason);
                                    setDeclineBookingId(null);
                                    setDeclineReason("");
                                }}
                                disabled={!declineReason.trim()}
                                className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                            >
                                Confirm Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
