"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { useAuth } from "@/context/AuthContext";
import EarningsStats from "@/components/provider/earnings/EarningsStats";
import IncomeTrendsChart from "@/components/provider/earnings/IncomeTrendsChart";
import RecentPayoutsTable from "@/components/provider/earnings/RecentPayoutsTable";
import LinkedAccountCard from "@/components/provider/earnings/LinkedAccountCard";
import Image from "next/image";

export default function ProviderEarningsPage() {
    const { user } = useAuth();

    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Top Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-4 md:px-10 py-3 sticky top-0 z-10">
                    <div className="flex items-center gap-8">
                        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">Earnings & Payouts</h2>
                        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] md:hidden pl-10">Earnings</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 md:gap-8">
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="size-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200 relative">
                                {user?.avatar ? (
                                    <Image src={user.avatar} alt="Profile" fill sizes="40px" className="object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">person</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-[1200px] mx-auto">
                    {/* Breadcrumbs & Title */}
                    <div className="flex flex-col gap-1 mb-6 md:mb-8">
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="hover:text-primary-500 cursor-pointer hidden md:inline">Financial Management</span>
                            <span className="material-symbols-outlined text-xs hidden md:inline">chevron_right</span>
                            <span className="text-gray-900">Earnings & Payouts</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-4">
                            <div>
                                <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Earnings Overview</h1>
                                <p className="text-gray-500 text-lg font-normal leading-normal">Track your service revenue and withdraw funds to your account.</p>
                            </div>
                            <button className="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary-500 text-white text-base font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all active:scale-95">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                                <span>Request Payout</span>
                            </button>
                        </div>
                    </div>

                    <EarningsStats />
                    <IncomeTrendsChart />
                    <RecentPayoutsTable />
                    <LinkedAccountCard />

                </div>
            </main>
        </div>
    );
}
