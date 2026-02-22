"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { CustomerDashboardResponse } from "@/types/backend";
import { Calendar, DollarSign, Star, Clock, ArrowRight, CheckCircle, Inbox } from "lucide-react";
import Link from "next/link";

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
                return "bg-green-100 text-green-600";
            case "PENDING":
                return "bg-orange-100 text-orange-600";
            case "APPROVED":
                return "bg-blue-100 text-blue-600";
            case "REJECTED":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0] || "User"}!</h1>
                <p className="text-sm text-gray-500">Here&apos;s your account overview</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                            <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <p className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                    <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900">Recent Bookings</h2>
                        {dashboard && dashboard.recentBookings.length > 0 && (
                            <Link href="/bookings" className="text-primary-500 text-xs font-medium flex items-center hover:text-primary-600">
                                View All <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                        )}
                    </div>

                    {dashboard && dashboard.recentBookings.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {dashboard.recentBookings.map((booking) => (
                                <div key={booking.id} className="p-3 md:p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-primary-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{formatServiceName(booking.serviceName)}</p>
                                            <p className="text-xs text-gray-500">{booking.providerName} • {formatDate(booking.bookingDate)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {booking.amount != null ? `₹${booking.amount.toLocaleString("en-IN")}` : "—"}
                                        </p>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusStyle(booking.status)}`}>
                                            {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-sm font-medium text-gray-900 mb-1">No bookings yet</h3>
                            <p className="text-xs text-gray-500">Book your first service to see it here.</p>
                            <Link href="/providers" className="inline-block mt-3 px-4 py-2 bg-primary-500 text-white text-xs font-medium rounded-lg hover:bg-primary-600 transition-colors">
                                Browse Services
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link key={action.label} href={action.href} className="flex items-center p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                        <Icon className="w-4 h-4 text-primary-500" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                                </Link>
                            );
                        })}
                    </div>

                    {dashboard && dashboard.pendingBookings > 0 && (
                        <div className="mt-4 bg-primary-50 rounded-lg p-3">
                            <div className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Pending</p>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        You have {dashboard.pendingBookings} pending booking{dashboard.pendingBookings > 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
