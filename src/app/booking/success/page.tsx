"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    // In a real app, we might fetch booking details using an ID from searchParams
    const bookingId = searchParams.get("id") || "BK-8829";

    return (
        <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen font-sans">
            {/* Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4 text-primary-500">
                    <div className="size-8">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">HomeFix Services</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/services" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary-500 transition-colors">Explore</Link>
                        <Link href="/bookings" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary-500 transition-colors">My Bookings</Link>
                        <Link href="/support" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary-500 transition-colors">Support</Link>
                    </nav>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto">
                {/* Success Icon Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                        <span className="material-symbols-outlined text-6xl text-green-600 dark:text-green-400">check_circle</span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold tracking-tight mb-3">Booking Confirmed!</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto">
                        Great news! Your service is successfully scheduled. We've sent the details to your email.
                    </p>
                </div>

                {/* Details Card */}
                <div className="w-full max-w-[600px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Booking ID</p>
                            <p className="text-lg font-bold text-primary-500">#{bookingId}</p>
                        </div>
                        <div className="text-right">
                            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">CONFIRMED</span>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="size-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-500">home_repair_service</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Service</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">Kitchen Faucet Repair</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-500">person</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Provider</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">John's Plumbing & Repair</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-500">calendar_today</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Date</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">Monday, Oct 24th</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-500">schedule</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Time</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">2:00 PM - 3:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col md:flex-row gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">event</span>
                            Add to Calendar
                        </button>
                        <Link href="/bookings" className="flex-1 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary-500/20">
                            <span className="material-symbols-outlined text-lg">list_alt</span>
                            View in My Bookings
                        </Link>
                    </div>
                </div>

                {/* Next Steps Section */}
                <div className="w-full max-w-[600px] bg-primary-50 dark:bg-primary-900/10 rounded-xl p-8 border border-primary-100 dark:border-primary-900/20">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-500">assignment_turned_in</span>
                        Next Steps
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="size-6 bg-primary-500/20 text-primary-500 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Professional Arrival</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Your professional will arrive within a 30-minute window of your scheduled time.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="size-6 bg-primary-500/20 text-primary-500 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Preparation</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Please ensure an adult is present at the property and the work area is clear of clutter.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="size-6 bg-primary-500/20 text-primary-500 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">Secure Payment</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Payment will be processed through our secure platform once the service is completed.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Footer Links */}
                <div className="mt-12 text-center text-sm">
                    <p className="text-slate-500 dark:text-slate-400">
                        Need to make changes or have questions? <Link href="/support" className="text-primary-500 font-semibold hover:underline">Contact Support</Link>
                    </p>
                    <div className="flex justify-center gap-6 mt-6">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors">
                            <span className="material-symbols-outlined text-base">print</span>
                            Print Receipt
                        </button>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors">
                            <span className="material-symbols-outlined text-base">share</span>
                            Share Details
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
