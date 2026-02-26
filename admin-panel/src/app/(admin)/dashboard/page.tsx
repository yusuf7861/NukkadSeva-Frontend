"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Users, Clock, MapPin, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
    totalProviders: number;
    pendingProviders: number;
    approvedProviders: number;
    rejectedProviders: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats>({ totalProviders: 0, pendingProviders: 0, approvedProviders: 0, rejectedProviders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [all, pending, approved, rejected] = await Promise.all([
                    api.get("/admin/all-providers"),
                    api.get("/admin/providers/pending"),
                    api.get("/admin/providers/approved"),
                    api.get("/admin/providers/rejected"),
                ]);
                setStats({
                    totalProviders: all.data.length,
                    pendingProviders: pending.data.length,
                    approvedProviders: approved.data.length,
                    rejectedProviders: rejected.data.length,
                });
            } catch (e) {
                console.error("Failed to fetch stats", e);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const cards = [
        { label: "Total Providers", value: stats.totalProviders, icon: Users, color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", href: "/providers" },
        { label: "Pending Approvals", value: stats.pendingProviders, icon: Clock, color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", href: "/providers?tab=pending" },
        { label: "Approved", value: stats.approvedProviders, icon: CheckCircle, color: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-700", href: "/providers?tab=approved" },
        { label: "Rejected", value: stats.rejectedProviders, icon: XCircle, color: "bg-red-500", light: "bg-red-50", text: "text-red-700", href: "/providers?tab=rejected" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Overview of your NukkadSeva platform</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4" />
                            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                            <div className="h-7 w-12 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all group"
                        >
                            <div className={`w-10 h-10 ${card.light} rounded-lg flex items-center justify-center mb-4`}>
                                <card.icon className={`w-5 h-5 ${card.text}`} />
                            </div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.label}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                        </Link>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/providers?tab=pending" className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Review Pending Providers</p>
                            <p className="text-xs text-gray-500">{stats.pendingProviders} awaiting review</p>
                        </div>
                    </Link>
                    <Link href="/cities" className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Manage Cities & Pincodes</p>
                            <p className="text-xs text-gray-500">Add or modify service areas</p>
                        </div>
                    </Link>
                    <Link href="/providers" className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">View All Providers</p>
                            <p className="text-xs text-gray-500">Browse provider directory</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
