"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Search, MapPin, User, Menu, X, ChevronDown, LogOut, Settings, Calendar, CreditCard } from "lucide-react";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14 md:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="NukkadSeva Logo" width={32} height={32} className="object-contain" />
                        <span className="text-lg md:text-xl font-bold text-primary-600 hidden sm:block">NukkadSeva</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                            Home
                        </Link>

                        <Link href="/providers" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                            Providers
                        </Link>
                    </nav>

                    {/* Desktop Auth/User */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <img
                                        src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                            <Link
                                                href={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "SERVICE_PROVIDER" || user?.role === "PROVIDER" ? "/provider/dashboard" : "/customer/dashboard"}
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <User className="w-4 h-4 mr-2" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/bookings"
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Calendar className="w-4 h-4 mr-2" />
                                                My Bookings
                                            </Link>
                                            <Link
                                                href="/payments"
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Payments
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Settings className="w-4 h-4 mr-2" />
                                                Settings
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    logout();
                                                }}
                                                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-primary-500"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-3">
                        <nav className="flex flex-col space-y-1">
                            <Link
                                href="/"
                                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                href="/providers"
                                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Providers
                            </Link>

                            {isAuthenticated && user ? (
                                <>
                                    <hr className="my-2" />
                                    <Link
                                        href={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "SERVICE_PROVIDER" || user?.role === "PROVIDER" ? "/provider/dashboard" : "/customer/dashboard"}
                                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/bookings"
                                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        My Bookings
                                    </Link>
                                    <Link
                                        href="/payments"
                                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Payments
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            logout();
                                        }}
                                        className="px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <hr className="my-2" />
                                    <Link
                                        href="/login"
                                        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="mx-3 px-4 py-2 bg-primary-500 text-white text-sm text-center rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
