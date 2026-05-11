"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { CustomerDashboardResponse } from "@/types/backend";
import { Calendar, DollarSign, Star, Clock, ArrowRight, CheckCircle, Inbox } from "lucide-react";
import Link from "next/link";
import { useCustomerSocket } from "@/hooks/useCustomerSocket";
import toast from "react-hot-toast";

const quickActions = [
    { label: "Book Service", href: "/providers", icon: Calendar },
    { label: "View Bookings", href: "/bookings", icon: Clock },
    { label: "Payments", href: "/customer/payments", icon: DollarSign },
];

export default function DashboardPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [dashboard, setDashboard] = useState<CustomerDashboardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);
                setToken(parsed.token || null);
            } catch (e) { }
        }
    }, []);

    const { isConnected, bookingUpdates, removeUpdate } = useCustomerSocket(token);

    useEffect(() => {
        if (bookingUpdates.length > 0 && dashboard) {
            const latest = bookingUpdates[0];
            setDashboard((prev) => {
                if (!prev) return prev;
                const updatedBookings = prev.recentBookings.map(b =>
                    b.id === latest.bookingId ? { ...b, status: latest.status } : b
                );
                return {
                    ...prev,
                    recentBookings: updatedBookings
                }
            });
            toast.success(`Booking status updated to ${latest.status}`, { icon: "🔔" });
            removeUpdate(latest.bookingId);
        }
    }, [bookingUpdates, removeUpdate, dashboard]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await api.get<CustomerDashboardResponse>("/customer/dashboard");
                setDashboard(data);
            } catch (err) {
                console.error("Failed to fetch dashboard", err);
                setError("Failed to load dashboard data.");
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchDashboard();
        }
    }, [authLoading, user]);

    if (authLoading || isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-6 lg:p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-3 text-sm text-primary-500 hover:underline">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const stats = [
        { label: "Total Bookings", value: dashboard?.totalBookings ?? 0, icon: Calendar, color: "bg-blue-100 text-blue-600" },
        { label: "Total Spent", value: `₹${(dashboard?.totalSpent ?? 0).toLocaleString("en-IN")}`, icon: DollarSign, color: "bg-green-100 text-green-600" },
        { label: "Avg Rating", value: dashboard?.averageRating ? dashboard.averageRating.toFixed(1) : "—", icon: Star, color: "bg-yellow-100 text-yellow-600" },
        { label: "Pending", value: dashboard?.pendingBookings ?? 0, icon: Clock, color: "bg-orange-100 text-orange-600" },
    ];

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    };

    const formatServiceName = (name: string) => {
        return name
            .split("_")
            .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
            .join(" ");
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "PENDING":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "APPROVED":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "REJECTED":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pb-24 pt-8 px-4 md:px-8 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="text-white">
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                            Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
                        </h1>
                        <p className="text-primary-100 text-sm md:text-base font-medium max-w-lg">
                            Manage your bookings, discover new services, and keep track of your home maintenance easily.
                        </p>
                    </div>
                    {isConnected && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/20 shadow-sm self-start">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            Live Sync Active
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-14 relative z-10">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
                                    <p className="text-sm font-semibold text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                                {dashboard && dashboard.recentBookings.length > 0 && (
                                    <Link href="/bookings" className="group text-primary-600 text-sm font-bold flex items-center hover:text-primary-700 transition-colors">
                                        View All 
                                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>

                            {dashboard && dashboard.recentBookings.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {dashboard.recentBookings.map((booking) => (
                                        <div key={booking.id} className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/80 transition-colors group">
                                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center border border-primary-100/50 shadow-sm group-hover:scale-105 transition-transform">
                                                    <Calendar className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{formatServiceName(booking.serviceName)}</p>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <span className="font-medium text-gray-700">{booking.providerName}</span>
                                                        <span className="mx-2 text-gray-300">•</span>
                                                        <span>{formatDate(booking.bookingDate)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                                <p className="text-lg font-bold text-gray-900">
                                                    {booking.amount != null ? `₹${booking.amount.toLocaleString("en-IN")}` : "—"}
                                                </p>
                                                <span className={`text-xs px-2.5 py-1 rounded-md font-bold border mt-0 sm:mt-2 ${getStatusStyle(booking.status)}`}>
                                                    {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                        <Inbox className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
                                    <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">You haven't booked any services yet. Explore our top-rated professionals and get started.</p>
                                    <Link href="/providers" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/30 hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all">
                                        Browse Services
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions & Alerts */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
                            <div className="space-y-3">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link key={action.label} href={action.href} className="group flex items-center p-3.5 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50/50 hover:shadow-sm transition-all">
                                            <div className="w-10 h-10 bg-gray-50 group-hover:bg-primary-100 rounded-lg flex items-center justify-center mr-4 transition-colors">
                                                <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary-600 transition-colors" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 group-hover:text-primary-700 transition-colors">{action.label}</span>
                                            <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Alerts / Insights */}
                        {dashboard && dashboard.pendingBookings > 0 && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                                <div className="flex items-start relative z-10">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm border border-amber-100">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-amber-900">Action Needed</p>
                                        <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                            You have <span className="font-extrabold">{dashboard.pendingBookings} pending booking{dashboard.pendingBookings > 1 ? "s" : ""}</span> awaiting confirmation.
                                        </p>
                                        <Link href="/bookings?status=PENDING" className="inline-block mt-3 text-sm font-bold text-amber-700 hover:text-amber-900 underline decoration-amber-300/50 underline-offset-4 transition-colors">
                                            Review now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {dashboard && dashboard.pendingBookings === 0 && (
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                                <div className="flex items-start relative z-10">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm border border-emerald-100">
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-emerald-900">All caught up!</p>
                                        <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                                            No pending actions required. You're good to go.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
