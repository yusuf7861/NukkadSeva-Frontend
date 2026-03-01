"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import RatingModal from "@/components/RatingModal";
import { Calendar, Clock, MapPin, Phone, Star, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";
import { useCustomerSocket } from "@/hooks/useCustomerSocket";
import toast from "react-hot-toast";
import Image from "next/image";

type BookingType = {
    id: string;
    service: string;
    provider: string;
    providerImage: string;
    date: string;
    time: string;
    address: string;
    phone: string;
    status: string;
    amount: number;
    canRate: boolean;
    isReviewed: boolean;
    otp: string | null;
    rejectionReason: string | null;
};

const tabs = ["All", "Upcoming", "Completed", "Cancelled"];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
    const [bookings, setBookings] = useState<BookingType[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    // Grab the token (simulate useAuth for token if possible, or assuming you have it imported)
    // NOTE: In a real app we'd get this from context like in ProviderDashboard
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve token from local storage (or context) for the websocket
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);
                setToken(parsed.token || null);
            } catch (e) { }
        }
    }, []);

    const { isConnected, bookingUpdates, removeUpdate } = useCustomerSocket(token);

    useEffect(() => {
        if (bookingUpdates.length > 0) {
            const latest = bookingUpdates[0];
            setBookings(prev => prev.map(b => {
                if (b.id === latest.bookingId) {
                    return {
                        ...b,
                        status: latest.status === 'PENDING' || latest.status === 'APPROVED' ? 'Upcoming' :
                            latest.status === 'COMPLETED' ? 'Completed' :
                                latest.status === 'REJECTED' || latest.status === 'CANCELLED' ? 'Cancelled' : latest.status,
                        otp: latest.completionOtp || b.otp,
                        rejectionReason: latest.rejectionReason || b.rejectionReason
                    };
                }
                return b;
            }));

            toast.success(`Booking status updated to ${latest.status}`, { icon: "🔔" });
            removeUpdate(latest.bookingId);
        }
    }, [bookingUpdates, removeUpdate]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/booking/customer");
                // Map the backend BookingResponseDto to the frontend BookingType
                const mappedBookings: BookingType[] = response.data.map((b: any) => {
                    const dt = b.bookingDateTime ? new Date(b.bookingDateTime) : null;
                    return {
                        id: b.id,
                        service: b.serviceType,
                        provider: b.provider?.name || "Unknown Provider",
                        providerImage: "https://via.placeholder.com/150", // Backend doesn't return this yet
                        date: dt ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBD",
                        time: dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "TBD",
                        address: b.customer?.address || "No address provided",
                        phone: b.provider?.contactNumber || "No phone provided",
                        status: b.status === 'PENDING' || b.status === 'APPROVED' ? 'Upcoming' :
                            b.status === 'COMPLETED' ? 'Completed' :
                                b.status === 'REJECTED' || b.status === 'CANCELLED' ? 'Cancelled' : b.status,
                        amount: b.priceEstimate || 0,
                        canRate: b.status === 'COMPLETED' && !(b.isReviewed || b.reviewed),
                        isReviewed: !!(b.isReviewed || b.reviewed),
                        otp: b.completionOtp || null,
                        rejectionReason: b.rejectionReason || null
                    };
                });
                setBookings(mappedBookings);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter((b) => activeTab === "All" || b.status === activeTab);

    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        setCancellingId(id);
        try {
            await api.put(`/booking/${id}/cancel`);
            toast.success("Booking cancelled successfully");
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to cancel booking");
        } finally {
            setCancellingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-600";
            case "Upcoming": return "bg-orange-100 text-orange-600";
            case "Cancelled": return "bg-red-100 text-red-600";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-0">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-gray-900">My Bookings</h1>
                        <p className="text-sm text-gray-500">Track all your service bookings</p>
                    </div>
                    {isConnected && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-200">
                            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Sync
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-4 overflow-x-auto pb-1">
                    {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "bg-primary-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <Image src={booking.providerImage} alt={booking.provider} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">{booking.service}</h3>
                                            <p className="text-xs text-gray-500">{booking.provider}</p>
                                            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{booking.date}</span>
                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{booking.time}</span>
                                            </div>
                                            <p className="flex items-center mt-1 text-xs text-gray-500">
                                                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />{booking.address}
                                            </p>
                                            {booking.status === "Upcoming" && booking.phone && (
                                                <p className="flex items-center mt-1 text-xs font-semibold text-primary-600">
                                                    <Phone className="w-3 h-3 mr-1 flex-shrink-0" /> Provider: {booking.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                        <p className="text-sm font-semibold text-gray-900 mt-1">₹{booking.amount}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3 pt-3 border-t border-gray-100 space-x-2">
                                    {booking.status === "Upcoming" && (
                                        <div className="flex w-full items-center gap-2">
                                            {booking.otp && (
                                                <div className="flex-1 text-[11px] font-bold text-gray-700 bg-gray-50 px-2 py-1.5 rounded border border-gray-200 flex items-center gap-1.5">
                                                    <span>OTP:</span>
                                                    <span className="text-base tracking-widest text-primary-600 font-mono">{booking.otp}</span>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => handleCancel(booking.id)}
                                                disabled={cancellingId === booking.id}
                                                className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition-colors ml-auto"
                                            >
                                                {cancellingId === booking.id ? "..." : "Cancel"}
                                            </button>
                                        </div>
                                    )}
                                    {booking.canRate && (
                                        <button onClick={() => { setSelectedBooking(booking); setShowRatingModal(true); }} className="px-3 py-1.5 text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center">
                                            <Star className="w-3 h-3 mr-1" />Rate
                                        </button>
                                    )}
                                    {booking.isReviewed && (
                                        <span className="text-xs text-gray-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500" />Rated</span>
                                    )}
                                </div>

                                {booking.status === "Cancelled" && booking.rejectionReason && (
                                    <div className="mt-3 bg-red-50 border border-red-100 rounded-lg p-3 flex gap-3 text-sm text-red-800">
                                        <XCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                                        <div>
                                            <p className="font-semibold text-red-900 mb-0.5">Declined by Provider</p>
                                            <p className="opacity-90">{booking.rejectionReason}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredBookings.length === 0 && (
                            <div className="bg-white rounded-lg p-8 text-center">
                                <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-sm font-medium text-gray-900 mb-1">No bookings found</h3>
                                <p className="text-xs text-gray-500">No {activeTab.toLowerCase()} bookings.</p>
                            </div>
                        )}
                    </div>
                )}

                {selectedBooking && (
                    <RatingModal
                        isOpen={showRatingModal}
                        onClose={() => setShowRatingModal(false)}
                        providerName={selectedBooking.provider}
                        serviceName={selectedBooking.service}
                        bookingId={selectedBooking.id}
                        onSuccess={() => {
                            setBookings(prev => prev.map(b => b.id === selectedBooking.id ? { ...b, canRate: false, isReviewed: true } : b));
                        }}
                    />
                )}
            </main>
        </div>
    );
}
