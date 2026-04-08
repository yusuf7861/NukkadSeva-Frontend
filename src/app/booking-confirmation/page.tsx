"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, Calendar, Clock, User, Briefcase, Printer, Share2, CalendarPlus, ListTodo } from "lucide-react";

function BookingConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const service = searchParams.get("service") || "Service Name";
    const provider = searchParams.get("provider") || "Service Provider";
    const rawDate = searchParams.get("date") || "";
    const rawTime = searchParams.get("time") || "";
    const bookingId = searchParams.get("bookingId") || `#BK-${Math.floor(1000 + Math.random() * 9000)}`;

    // Format Date nicely
    let formattedDate = rawDate;
    if (rawDate) {
        try {
            const dateObj = new Date(rawDate);
            formattedDate = dateObj.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });
            // Add ordinal suffix
            const day = dateObj.getDate();
            const ordinal = ["st", "nd", "rd"][((day + 90) % 100 - 10) % 10 - 1] || "th";
            formattedDate += ordinal;
        } catch(e) {}
    }

    // Format Time nicely
    let formattedTime = rawTime;
    if (rawTime) {
        try {
            const [hoursStr, minutesStr] = rawTime.split(':');
            const hours = parseInt(hoursStr, 10);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const h = hours % 12 || 12;
            formattedTime = `${h}:${minutesStr} ${ampm}`;
        } catch(e) {}
    }

    const displayDate = formattedDate || "Scheduled Date";
    const displayTime = formattedTime || "Scheduled Time";

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Header />

            <main className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-white stroke-[3]" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Booking Confirmed!</h1>
                <p className="text-gray-500 text-center max-w-md text-[15px] leading-relaxed mb-10">
                    Great news! Your service is successfully scheduled. We've sent the details to your email.
                </p>

                {/* Details Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden mb-6">
                    {/* Card Header Context */}
                    <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1">Booking ID</p>
                            <p className="text-lg font-bold text-primary-500">{bookingId}</p>
                        </div>
                        <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Confirmed
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        {/* Service */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-1">Service</p>
                                <p className="font-semibold text-gray-900">{service}</p>
                            </div>
                        </div>

                        {/* Provider */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-1">Provider</p>
                                <p className="font-semibold text-gray-900">{provider}</p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-1">Date</p>
                                <p className="font-semibold text-gray-900">{displayDate}</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-1">Time</p>
                                <p className="font-semibold text-gray-900">{displayTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
                            <CalendarPlus className="w-4 h-4" />
                            Add to Calendar
                        </button>
                        <Link href="/customer/bookings" className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 rounded-xl text-sm font-semibold text-white hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
                            <ListTodo className="w-4 h-4" />
                            View in My Bookings
                        </Link>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-[#F1F5F9] border border-slate-200 rounded-2xl w-full max-w-2xl px-8 py-7 shadow-sm mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded bg-primary-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Next Steps</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-primary-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-[15px] mb-1">Professional Arrival</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Your professional will arrive within a 30-minute window of your scheduled time.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-primary-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-[15px] mb-1">Preparation</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Please ensure an adult is present at the property and the work area is clear of clutter.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-primary-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-[15px] mb-1">Secure Payment</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Payment will be processed through our secure platform once the service is completed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="text-center w-full max-w-2xl">
                    <p className="text-sm font-medium text-slate-500 mb-6">
                        Need to make changes or have questions? <Link href="#" className="flex-none text-primary-500 hover:text-primary-600">Contact Support</Link>
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                            <Printer className="w-4 h-4" /> Print Receipt
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                            <Share2 className="w-4 h-4" /> Share Details
                        </button>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Loading...</div>}>
            <BookingConfirmationContent />
        </Suspense>
    );
}
