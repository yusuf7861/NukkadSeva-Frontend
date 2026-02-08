"use client";

import { useAuth } from "@/context/AuthContext";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import Image from "next/image";

export default function ProviderDashboard() {
    const { user } = useAuth();

    return (
        <div className="flex bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Top Bar / Header */}
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Welcome back,</span>
                        <span className="font-bold text-slate-900 dark:text-white">{user?.name || "Provider"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </button>
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400">person</span>
                            )}
                        </div>
                    </div>
                </header>
                <div className="p-8 max-w-[1200px] mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Earnings</span>
                                <span className="text-primary-500 material-symbols-outlined">currency_exchange</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">₹12,450.00</p>
                            <p className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% this month
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Jobs Completed</span>
                                <span className="text-primary-500 material-symbols-outlined">task_alt</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">148</p>
                            <p className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span> +5 new jobs
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Average Rating</span>
                                <span className="text-amber-400 material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">4.9</p>
                            <p className="text-slate-400 text-xs font-medium">From 112 reviews</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Requests</span>
                                <span className="text-primary-500 material-symbols-outlined">pending_actions</span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight">6</p>
                            <p className="text-primary-500 text-xs font-medium">Needs response</p>
                        </div>
                    </div>
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* New Requests Feed */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight">New Requests</h2>
                                <button className="text-primary-500 text-sm font-semibold hover:underline">View All</button>
                            </div>
                            {/* Job Card 1 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                                <div className="md:w-48 h-48 md:h-auto overflow-hidden shrink-0 relative bg-slate-200">
                                    {/* Placeholder for Job Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-4xl">plumbing</span>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded px-2 py-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-slate-900">schedule</span>
                                        <span className="text-[10px] font-bold text-slate-900">24m ago</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold">Leaking Faucet Repair</h3>
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded text-[11px] font-bold uppercase">Plumbing</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                            <span>North Hills • 2.4 miles away</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                            Kitchen sink faucet is dripping constantly. Requires immediate attention. Parts may be needed for a standard Delta brand fixture.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 bg-primary-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-primary-600 transition-colors">Accept Job</button>
                                        <button className="px-4 h-10 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Decline</button>
                                    </div>
                                </div>
                            </div>
                            {/* Job Card 2 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                                <div className="md:w-48 h-48 md:h-auto overflow-hidden shrink-0 relative bg-slate-200">
                                    {/* Placeholder for Job Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-4xl">electrical_services</span>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded px-2 py-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-slate-900">schedule</span>
                                        <span className="text-[10px] font-bold text-slate-900">1h ago</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold">Electrical Panel Inspection</h3>
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded text-[11px] font-bold uppercase">Electrical</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                            <span>Downtown • 5.0 miles away</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                            Routine inspection for a commercial property. Checking for outdated breakers and general wiring safety compliance.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 bg-primary-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-primary-600 transition-colors">Accept Job</button>
                                        <button className="px-4 h-10 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Decline</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Content */}
                        <div className="flex flex-col gap-6">
                            {/* Service Radius Map Preview */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary-500">my_location</span>
                                    Service Area
                                </h3>
                                <div className="w-full h-48 rounded-lg bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                                        <span className="material-symbols-outlined text-4xl">map</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Radius: 15 miles</span>
                                    <button className="text-primary-500 font-semibold">Edit Radius</button>
                                </div>
                            </div>
                            {/* Upcoming Schedule Brief */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary-500">event_note</span>
                                    Today's Schedule
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-primary-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">10:00 AM</p>
                                            <p className="text-sm font-semibold">AC Unit Maintenance</p>
                                            <p className="text-[11px] text-slate-400 italic">Beverly Hills</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">01:30 PM</p>
                                            <p className="text-sm font-semibold">Garage Door Repair</p>
                                            <p className="text-[11px] text-slate-400 italic">Westwood</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">04:00 PM</p>
                                            <p className="text-sm font-semibold">Lighting Installation</p>
                                            <p className="text-[11px] text-slate-400 italic">Santa Monica</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">
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
