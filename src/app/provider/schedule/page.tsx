"use client";

import { useState, useEffect } from "react";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import api from "@/lib/api";

type Booking = {
    id: string;
    serviceType: string;
    bookingDateTime: string;
    customer: {
        name: string;
        address: string;
        phone: string;
    };
    priceEstimate: number;
    note: string;
    status: string;
};

export default function ProviderSchedulePage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await api.get("/booking/provider");
                // Include confirmed, completed, and past bookings, exclude pending
                const active = res.data.filter((b: any) => b.status !== "PENDING");
                setBookings(active);
            } catch (err: any) {
                console.error("Failed to fetch schedule", err);
                setError(err.response?.data?.message || "Failed to load schedule");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    // Calendar logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Helper to get bookings for a specific date
    const getBookingsForDate = (day: number, m: number, y: number) => {
        return bookings.filter(b => {
            const date = new Date(b.bookingDateTime);
            return date.getDate() === day && date.getMonth() === m && date.getFullYear() === y;
        }).sort((a, b) => new Date(a.bookingDateTime).getTime() - new Date(b.bookingDateTime).getTime());
    };

    // Calculate the array of days to render in the grid
    const blanks = Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`blank-${i}`} className="p-2 border border-transparent"></div>);
    const days = Array.from({ length: daysInMonth }).map((_, i) => {
        const dayNum = i + 1;
        const dayBookings = getBookingsForDate(dayNum, month, year);
        const hasJobs = dayBookings.length > 0;

        const isSelected = selectedDate.getDate() === dayNum && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

        const isToday = new Date().getDate() === dayNum && new Date().getMonth() === month && new Date().getFullYear() === year;

        return (
            <div
                key={`day-${dayNum}`}
                onClick={() => setSelectedDate(new Date(year, month, dayNum))}
                className={`min-h-[80px] sm:min-h-[100px] p-2 border-t border-gray-100 relative cursor-pointer hover:bg-gray-50 transition-colors flex flex-col items-center sm:items-start ${isSelected ? 'bg-primary-50 hover:bg-primary-50 ring-inset ring-2 ring-primary-500 rounded-lg' : ''}`}
            >
                <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${isToday ? 'bg-gray-900 text-white' : isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                    {dayNum}
                </span>

                {hasJobs && (
                    <div className="mt-1 w-full space-y-1 hidden sm:block">
                        {dayBookings.slice(0, 2).map((b, idx) => {
                            const isPast = ["COMPLETED", "COMPLETED_PENDING_PAYMENT", "DECLINED", "CANCELLED"].includes(b.status);

                            return (
                                <div key={idx} className={`${isPast ? 'bg-gray-100 text-gray-600' : 'bg-primary-100 text-primary-700'} text-[10px] sm:text-xs px-1.5 py-0.5 rounded truncate font-semibold w-full`}>
                                    {new Date(b.bookingDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            );
                        })}
                        {dayBookings.length > 2 && (
                            <div className="text-[10px] text-gray-500 font-semibold px-1">+{dayBookings.length - 2} more</div>
                        )}
                    </div>
                )}
                {/* Mobile indicator DOT */}
                {hasJobs && (
                    <div className="mt-1 flex gap-1 sm:hidden">
                        {[...Array(Math.min(dayBookings.length, 3))].map((_, idx) => {
                            const b = dayBookings[idx];
                            const isPast = ["COMPLETED", "COMPLETED_PENDING_PAYMENT", "DECLINED", "CANCELLED"].includes(b.status);
                            return (
                                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-gray-400' : 'bg-primary-500'}`}></div>
                            )
                        })}
                    </div>
                )}
            </div>
        );
    });

    const selectedBookings = getBookingsForDate(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear());

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <ProviderSidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Schedule</h1>
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Calendar Section */}
                    <div className="xl:col-span-2 flex flex-col">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Calendar Header */}
                            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                                    {monthNames[month]} {year}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentDate(new Date())}
                                        className="px-3 py-1.5 text-sm font-semibold hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-gray-700"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={handleNextMonth}
                                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="p-4 sm:p-6">
                                <div className="grid grid-cols-7 mb-2">
                                    {dayNames.map(day => (
                                        <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4">
                                    {blanks}
                                    {days}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Agenda Sidebar */}
                    <div className="flex flex-col">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                    <span className="text-xl font-bold">{selectedDate.getDate()}</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="py-12 flex justify-center">
                                    <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                </div>
                            ) : selectedBookings.length === 0 ? (
                                <div className="py-12 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-gray-400 text-2xl">free_cancellation</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">No jobs scheduled</p>
                                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">You have no uncompleted bookings on this date.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {selectedBookings.map((job) => {
                                        const isPast = ["COMPLETED", "COMPLETED_PENDING_PAYMENT"].includes(job.status);
                                        const isDeclined = ["DECLINED", "CANCELLED"].includes(job.status);

                                        let statusColor = "bg-primary-50 text-primary-700";
                                        let ringColor = "group-hover:w-1.5 bg-primary-500 text-primary-500";
                                        let statusLabel = "Upcoming";

                                        if (isPast) {
                                            statusColor = "bg-emerald-50 text-emerald-700";
                                            ringColor = "group-hover:w-1.5 bg-emerald-500 text-emerald-500";
                                            statusLabel = "Completed";
                                        } else if (isDeclined) {
                                            statusColor = "bg-red-50 text-red-700";
                                            ringColor = "group-hover:w-1.5 bg-red-500 text-red-500";
                                            statusLabel = job.status === "DECLINED" ? "Declined" : "Cancelled";
                                        }

                                        return (
                                            <div key={job.id} className="relative p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all group overflow-hidden">
                                                <div className={`absolute top-0 left-0 bottom-0 w-1 transition-all ${ringColor}`}></div>

                                                <div className="flex justify-between items-start mb-2 pl-2">
                                                    <div>
                                                        <p className={`text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${ringColor.split(" ")[2]}`}>
                                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                            {new Date(job.bookingDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{job.serviceType.replace(/_/g, " ")}</h4>
                                                    </div>
                                                    <div className={`${statusColor} px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider`}>
                                                        {statusLabel}
                                                    </div>
                                                </div>

                                                <div className="pl-2 mt-3 space-y-2">
                                                    <div className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 shrink-0">person</span>
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-700">{job.customer?.name}</p>
                                                            {job.customer?.phone && <p className="text-[11px] text-gray-500">{job.customer.phone}</p>}
                                                        </div>
                                                    </div>
                                                    {job.customer?.address && (
                                                        <div className="flex items-start gap-2">
                                                            <span className="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 shrink-0">location_on</span>
                                                            <p className="text-[11px] text-gray-600 leading-snug">{job.customer.address}</p>
                                                        </div>
                                                    )}
                                                    {job.note && (
                                                        <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-100">
                                                            <span className="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 shrink-0">notes</span>
                                                            <p className="text-[11px] text-gray-500 italic">"{job.note}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
