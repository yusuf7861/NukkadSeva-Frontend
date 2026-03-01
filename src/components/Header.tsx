"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Search, MapPin, User, Menu, X, ChevronDown, LogOut, Settings, Calendar, CreditCard, UserCircle } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    const dropdownVariants: Variants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
        exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" as const } }
    };

    const mobileMenuVariants: Variants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" as const } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" as const } }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Brand Logo */}
                    <Link href="/" className="relative flex items-center shrink-0 w-44 md:w-56 h-10 md:h-12 group transition-transform hover:scale-[1.02] active:scale-95">
                        <Image
                            src="/logo.png"
                            alt="NukkadSeva Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 border border-gray-200/50 bg-white/50 px-2 py-1.5 rounded-2xl shadow-sm">
                        <Link href="/" className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all">
                            Home
                        </Link>
                        <Link href="/providers" className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all">
                            Find Providers
                        </Link>
                    </nav>

                    {/* Desktop Auth/User & Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center space-x-3">
                            {isAuthenticated && user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') setIsProfileOpen(false);
                                        }}
                                        aria-expanded={isProfileOpen}
                                        aria-haspopup="menu"
                                        aria-controls="profile-menu"
                                        className="flex items-center space-x-2 px-2 py-1.5 rounded-xl hover:bg-gray-100/80 border border-transparent hover:border-gray-200/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 active:scale-95"
                                    >
                                        <img
                                            src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100 shadow-sm"
                                        />
                                        <div className="flex flex-col items-start hidden lg:flex">
                                            <span className="text-sm font-bold text-gray-800 leading-none">{user.name?.split(" ")[0]}</span>
                                            <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider mt-1">{user.role.replace('_', ' ')}</span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                id="profile-menu"
                                                role="menu"
                                                aria-orientation="vertical"
                                                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50 lg:hidden">
                                                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                                    <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                                                </div>

                                                <Link
                                                    href={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "SERVICE_PROVIDER" || user?.role === "PROVIDER" ? "/provider/dashboard" : "/customer/dashboard"}
                                                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    role="menuitem"
                                                >
                                                    <UserCircle className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/bookings"
                                                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    role="menuitem"
                                                >
                                                    <Calendar className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                                                    My Bookings
                                                </Link>
                                                <Link
                                                    href="/payments"
                                                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    role="menuitem"
                                                >
                                                    <CreditCard className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                                                    Payments
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    role="menuitem"
                                                >
                                                    <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                                                    Settings
                                                </Link>
                                                <div className="h-px bg-gray-100 my-1 mx-2" />
                                                <button
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        logout();
                                                    }}
                                                    role="menuitem"
                                                    className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors group"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-500" />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-primary-600 transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-primary-600 shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 top-16 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden z-50 md:hidden"
                        >
                            <div className="px-4 py-6 flex flex-col gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                                <Link
                                    href="/"
                                    className="px-4 py-3 text-base font-bold text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/providers"
                                    className="px-4 py-3 text-base font-bold text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Find Providers
                                </Link>

                                <div className="h-px bg-gray-100 my-2" />

                                {isAuthenticated && user ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="px-4 py-3 flex items-center gap-3 mb-2 bg-gray-50 rounded-xl">
                                            <img
                                                src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                                                <p className="text-xs font-semibold text-primary-600 uppercase mt-0.5">{user.role.replace('_', ' ')}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "SERVICE_PROVIDER" || user?.role === "PROVIDER" ? "/provider/dashboard" : "/customer/dashboard"}
                                            className="px-4 py-3 flex items-center text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <UserCircle className="w-5 h-5 mr-3 text-gray-400" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/bookings"
                                            className="px-4 py-3 flex items-center text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                                            My Bookings
                                        </Link>
                                        <Link
                                            href="/payments"
                                            className="px-4 py-3 flex items-center text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                                            Payments
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="px-4 py-3 flex items-center text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Settings className="w-5 h-5 mr-3 text-gray-400" />
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                logout();
                                            }}
                                            className="px-4 py-3 mt-2 flex items-center w-full text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                                        >
                                            <LogOut className="w-5 h-5 mr-3 text-red-500" />
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <Link
                                            href="/login"
                                            className="px-4 py-3 text-center text-base font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="px-4 py-3 text-center text-base font-bold bg-gray-900 text-white hover:bg-primary-600 rounded-xl transition-colors shadow-md shadow-gray-900/10"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
