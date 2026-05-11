"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    Home,
    Calendar,
    CreditCard,
    User,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const menuItems = [
    { icon: Home, label: "Dashboard", href: "/customer/dashboard" },
    { icon: Calendar, label: "Bookings", href: "/customer/bookings" },
    { icon: CreditCard, label: "Payments", href: "/customer/payments" },
    { icon: User, label: "Profile", href: "/customer/profile" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-30 p-2.5 bg-white rounded-xl shadow-md border border-gray-100 lg:hidden hover:bg-gray-50 transition-colors"
            >
                <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-all duration-300 ease-in-out flex flex-col ${
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                } ${isCollapsed ? "w-20" : "w-64"}`}
            >
                {/* Header */}
                <div className={`flex items-center h-20 px-4 mb-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {isCollapsed ? (
                        <Link href="/" className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                            <Image src="/brand-logo.png" alt="NukkadSeva" width={32} height={32} className="object-contain" />
                        </Link>
                    ) : (
                        <Link href="/" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                            <Image src="/brand-logo.png" alt="NukkadSeva Icon" width={32} height={32} className="object-contain" />
                            <Image src="/brand-text.png" alt="NukkadSeva" width={110} height={32} className="h-6 w-auto object-contain" />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex items-center justify-center p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>

                {/* User Info */}
                {user && (
                    <div className={`px-4 mb-6 transition-all duration-300 ${isCollapsed ? 'opacity-100' : ''}`}>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm rounded-2xl'}`}>
                            <div className="relative">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name || "User"}
                                        className="rounded-full object-cover border-2 border-white shadow-sm transition-all w-10 h-10"
                                    />
                                ) : (
                                    <div className="rounded-full border-2 border-white shadow-sm transition-all w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                        <span className="text-primary-700 font-bold text-sm">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5 text-primary-600" />}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0 ml-3">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`group flex items-center py-2.5 transition-all duration-200 rounded-xl relative ${
                                    isActive
                                        ? "bg-primary-50 text-primary-700 font-bold"
                                        : "text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900"
                                } ${isCollapsed ? "justify-center px-0" : "px-3"}`}
                                title={isCollapsed ? item.label : undefined}
                            >
                                {isActive && !isCollapsed && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-r-full" />
                                )}
                                <Icon className={`w-5 h-5 transition-colors ${
                                    isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
                                } ${isCollapsed ? "" : "mr-3"}`} />
                                {!isCollapsed && (
                                    <span className="truncate">{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 mt-auto border-t border-gray-100">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className={`group flex items-center w-full py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all ${
                            isCollapsed ? "justify-center px-0" : "px-3"
                        }`}
                        title={isCollapsed ? "Logout" : undefined}
                    >
                        <LogOut className={`w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors ${isCollapsed ? "" : "mr-3"}`} />
                        {!isCollapsed && "Logout"}
                    </button>
                </div>
            </aside>
        </>
    );
}
