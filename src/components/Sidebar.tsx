"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    Home,
    Calendar,
    CreditCard,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
} from "lucide-react";

const menuItems = [
    { icon: Home, label: "Dashboard", href: "/customer/dashboard" },
    { icon: Calendar, label: "Bookings", href: "/customer/bookings" },
    { icon: CreditCard, label: "Payments", href: "/customer/payments" },
    { icon: User, label: "Profile", href: "/customer/profile" },
    { icon: Settings, label: "Settings", href: "/customer/settings" },
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-3 left-3 z-30 p-2 bg-white rounded-lg shadow-md lg:hidden"
            >
                <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } ${isCollapsed ? "w-16" : "w-56"}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between h-14 px-3 border-b border-gray-200">
                        {!isCollapsed && (
                            <Link href="/" className="text-lg font-bold text-primary-500">
                                NukkadSeva
                            </Link>
                        )}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:block p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                        >
                            <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    {/* User Info */}
                    {user && !isCollapsed && (
                        <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                        ? "bg-primary-50 text-primary-600 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
                                    {!isCollapsed && item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-2 border-t border-gray-200">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                logout();
                            }}
                            className={`flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
                            title={isCollapsed ? "Logout" : undefined}
                        >
                            <LogOut className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
                            {!isCollapsed && "Logout"}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
