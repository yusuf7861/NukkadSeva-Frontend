"use client";

import { useAuth } from "@/context/AuthContext";
import { Calendar, DollarSign, Star, Clock, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Total Bookings", value: "24", icon: Calendar, color: "bg-blue-100 text-blue-600" },
    { label: "Total Spent", value: "₹12,450", icon: DollarSign, color: "bg-green-100 text-green-600" },
    { label: "Avg Rating", value: "4.8", icon: Star, color: "bg-yellow-100 text-yellow-600" },
    { label: "Pending", value: "2", icon: Clock, color: "bg-orange-100 text-orange-600" },
];

const recentBookings = [
    { id: 1, service: "Plumbing Repair", provider: "Rajesh Kumar", date: "Feb 5", status: "Completed", amount: "₹599" },
    { id: 2, service: "Electrical Work", provider: "Amit Singh", date: "Feb 3", status: "Completed", amount: "₹899" },
    { id: 3, service: "House Painting", provider: "Priya Sharma", date: "Feb 10", status: "Upcoming", amount: "₹2,499" },
];

const quickActions = [
    { label: "Book Service", href: "/providers", icon: Calendar },
    { label: "View Bookings", href: "/bookings", icon: Clock },
    { label: "Payments", href: "/payments", icon: DollarSign },
];

export default function DashboardPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" /></div>;
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0] || "User"}!</h1>
                <p className="text-sm text-gray-500">Here's your account overview</p>
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
                        <Link href="/bookings" className="text-primary-500 text-xs font-medium flex items-center hover:text-primary-600">
                            View All <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="p-3 md:p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-primary-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                                        <p className="text-xs text-gray-500">{booking.provider} • {booking.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{booking.amount}</p>
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${booking.status === "Completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                                        }`}>{booking.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
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

                    <div className="mt-4 bg-primary-50 rounded-lg p-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Upcoming</p>
                                <p className="text-xs text-gray-600 mt-0.5">House Painting on Feb 10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
