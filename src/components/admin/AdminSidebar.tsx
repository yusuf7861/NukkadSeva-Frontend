"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">home_repair_service</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">HomeFix Admin</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/dashboard")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span>Overview</span>
                    </Link>
                    <Link
                        href="/admin/verification"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/verification")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">verified_user</span>
                        <span>Provider Verification</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/users")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">group</span>
                        <span>User Management</span>
                    </Link>
                    <Link
                        href="/admin/services"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/services")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">category</span>
                        <span>Service Categories</span>
                    </Link>
                </div>
                <div>
                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Operations</p>
                    <Link
                        href="/admin/disputes"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/disputes")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">gavel</span>
                        <span>Dispute Resolution</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive("/admin/settings")
                            ? "bg-primary-50 text-primary-500 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span>Platform Settings</span>
                    </Link>
                </div>
            </nav>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="relative w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                        {user?.avatar ? (
                            <Image src={user.avatar} alt="Profile" fill sizes="40px" className="object-cover" />
                        ) : (
                            <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-slate-400">person</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name || "Admin"}</p>
                        <p className="text-xs text-slate-500 truncate">Super Admin</p>
                    </div>
                    <button onClick={logout} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined text-xl">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
