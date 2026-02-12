"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProviderSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-3 left-3 z-30 p-2 bg-white rounded-lg shadow-md lg:hidden"
            >
                <span className="material-symbols-outlined text-gray-600">menu</span>
            </button>

            {/* Sidebar */}
            <aside className={`w-64 border-r border-gray-200 bg-white flex flex-col shrink-0 h-screen fixed lg:static top-0 z-50 transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="p-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500 size-10 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">build</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold leading-none text-gray-900">ProFix Solutions</h1>
                            <p className="text-[10px] text-primary-500 font-semibold uppercase tracking-wider mt-1">Verified Contractor</p>
                        </div>
                    </div>
                    {/* Close Button for Mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <Link
                        href="/provider/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/provider/dashboard")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium leading-normal">Dashboard</span>
                    </Link>
                    <Link
                        href="/provider/schedule"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/provider/schedule")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span className="text-sm font-medium leading-normal">My Schedule</span>
                    </Link>
                    <Link
                        href="/provider/earnings"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/provider/earnings")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span className="material-symbols-outlined">payments</span>
                        <span className="text-sm font-medium leading-normal">Earnings History</span>
                    </Link>
                    <Link
                        href="/provider/areas"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/provider/areas")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span className="material-symbols-outlined">map</span>
                        <span className="text-sm font-medium leading-normal">Service Areas</span>
                    </Link>
                    <div className="pt-4 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Account</div>
                    <Link
                        href="/provider/profile"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/provider/profile")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium leading-normal">Profile Settings</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white rounded-lg h-10 px-4 text-sm font-bold hover:bg-primary-600 transition-all">
                        <span className="material-symbols-outlined text-[20px]">sensors</span>
                        <span>Go Online</span>
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 rounded-lg h-10 px-4 text-sm font-bold hover:bg-red-100 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
