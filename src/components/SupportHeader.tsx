"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function SupportHeader() {
    const { user, isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname?.startsWith(path) ? "text-primary-600 font-bold border-b-2 border-primary-600" : "text-gray-600 hover:text-primary-600 font-medium";
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Logo & Title */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-1.5 shrink-0 group transition-transform hover:scale-[1.02] active:scale-95">
                            <Image
                                src="/brand-logo.png"
                                alt="NukkadSeva Icon"
                                width={32}
                                height={32}
                                className="h-8 w-auto object-contain"
                                priority
                            />
                            <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">Support Center</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
                        <Link href="/support" className={`pb-1 px-1 transition-colors ${isActive('/support')}`}>
                            Help Center
                        </Link>
                        <Link href="/support/disputes" className={`pb-1 px-1 transition-colors ${isActive('/support/disputes')}`}>
                            Dispute Resolution
                        </Link>
                        <Link href="/legal/terms" className={`pb-1 px-1 transition-colors ${isActive('/legal')}`}>
                            Legal & Privacy
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center space-x-3">
                            {isAuthenticated && user ? (
                                <Link
                                    href={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "SERVICE_PROVIDER" ? "/provider/dashboard" : "/customer/dashboard"}
                                    className="flex items-center gap-2 p-1 pl-2 pr-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                                >
                                    <img
                                        src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                        alt={user.name}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user.name?.split(" ")[0]}</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg px-4 py-4 flex flex-col gap-4 z-50">
                    <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg py-2 ${isActive('/support')}`}>
                        Help Center
                    </Link>
                    <Link href="/support/disputes" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg py-2 ${isActive('/support/disputes')}`}>
                        Dispute Resolution
                    </Link>
                    <Link href="/legal/terms" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg py-2 ${isActive('/legal')}`}>
                        Legal & Privacy
                    </Link>
                </div>
            )}
        </header>
    );
}
