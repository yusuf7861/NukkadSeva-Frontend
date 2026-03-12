"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";

export default function ProviderEarningsPage() {
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
                </header>

                {/* Coming Soon */}
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
                    <div className="relative mb-8">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-400" style={{ fontSize: '56px' }}>account_balance_wallet</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
                            <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>schedule</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight text-center">
                        Coming Soon
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg mt-3 text-center max-w-md leading-relaxed">
                        We&apos;re building a powerful earnings dashboard so you can track revenue, request payouts, and manage your finances — all in one place.
                    </p>

                    <div className="flex items-center gap-3 mt-8 px-5 py-3 rounded-xl bg-primary-50 border border-primary-100">
                        <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>notifications_active</span>
                        <span className="text-sm font-medium text-primary-700">You&apos;ll be notified when this feature is ready.</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
