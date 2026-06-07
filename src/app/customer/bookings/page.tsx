"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import RatingModal from "@/components/RatingModal";
import { Calendar, Clock, MapPin, Phone, Star, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";
import { useCustomerSocket } from "@/hooks/useCustomerSocket";
import toast from "react-hot-toast";

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");

type BookingType = {
    id: string;
    service: string;
    provider: string;
    providerBusinessName: string;
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
                    
                    let extractedAddress = "No address provided";
                    if (b.serviceAddress) {
                        extractedAddress = typeof b.serviceAddress === 'string' ? b.serviceAddress : (b.serviceAddress.fullAddress || b.serviceAddress.address || "No address provided");
                    } else if (b.address) {
                        extractedAddress = typeof b.address === 'string' ? b.address : (b.address.fullAddress || b.address.address || "No address provided");
                    } else if (b.customer) {
                        if (b.customer.fullAddress) extractedAddress = b.customer.fullAddress;
                        else if (b.customer.address) extractedAddress = typeof b.customer.address === 'string' ? b.customer.address : (b.customer.address.fullAddress || "No address provided");
                    }

                    return {
                        id: b.id,
                        service: b.serviceType,
                        provider: b.provider?.name || "Unknown Provider",
                        providerBusinessName: b.provider?.businessName || "",
                        providerImage: b.provider?.profilePicture
                            ? (b.provider.profilePicture.startsWith("http") ? b.provider.profilePicture : `${BACKEND_URL}${b.provider.profilePicture}`)
                            : "",
                        date: dt ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBD",
                        time: dt ? dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "TBD",
                        address: extractedAddress,
                        phone: b.provider?.contactNumber || "No phone provided",
                        status: b.status === 'PENDING' || b.status === 'APPROVED' ? 'Upcoming' :
                            b.status === 'COMPLETED' ? 'Completed' :
                                b.status === 'REJECTED' || b.status === 'CANCELLED' ? 'Cancelled' : b.status,
                        amount: b.finalPrice || b.priceEstimate || 0,
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
            case "Completed": return "bg-emerald-100 text-emerald-700 border-emerald-200 border";
            case "Upcoming": return "bg-amber-100 text-amber-700 border-amber-200 border";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200 border";
            default: return "bg-gray-100 text-gray-700 border-gray-200 border";
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 w-full pb-12">
                {/* Header / Hero Section */}
                <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pb-24 pt-8 px-4 md:px-8 shadow-inner relative z-0">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="text-white">
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">My Bookings</h1>
                            <p className="text-primary-100 text-sm md:text-base font-medium">Track and manage all your service appointments.</p>
                        </div>
                        {isConnected && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/20 shadow-sm self-start">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                Live Sync Active
                            </div>
                        )}
                    </div>
                    
                    {/* Tabs overlapping within hero */}
                    <div className="max-w-7xl mx-auto mt-8 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                                    activeTab === tab 
                                        ? "bg-white text-primary-700 shadow-md transform -translate-y-0.5" 
                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
                    {/* Bookings List */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex items-start space-x-4">
                                            {booking.providerImage ? (
                                                <img src={booking.providerImage} alt={booking.provider} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform" />
                                            ) : (
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 flex items-center justify-center text-lg font-extrabold flex-shrink-0 shadow-sm border border-primary-100/50 group-hover:scale-105 transition-transform">
                                                    {booking.provider?.charAt(0) || "P"}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{booking.service}</h3>
                                                <p className="text-sm font-medium text-gray-600">{booking.provider}</p>
                                                {booking.providerBusinessName && (
                                                    <p className="text-xs font-semibold text-gray-400 mt-0.5">{booking.providerBusinessName}</p>
                                                )}
                                                
                                                <div className="flex flex-wrap gap-3 mt-3">
                                                    <div className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />{booking.date}
                                                    </div>
                                                    <div className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                        <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />{booking.time}
                                                    </div>
                                                </div>
                                                
                                                <p className="flex items-start mt-3 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400 mt-0.5" />
                                                    <span className="leading-tight">{booking.address}</span>
                                                </p>
                                                
                                                {booking.status === "Upcoming" && booking.phone && booking.phone !== "No phone provided" && (
                                                    <p className="flex items-center mt-2 text-sm font-bold text-primary-600 bg-primary-50 w-fit px-3 py-1.5 rounded-lg border border-primary-100">
                                                        <Phone className="w-4 h-4 mr-2 flex-shrink-0" /> {booking.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-gray-50">
                                            <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-xl font-extrabold text-gray-900 mt-1">₹{booking.amount}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-end mt-4 pt-4 border-t border-gray-50 gap-3">
                                        {booking.status === "Upcoming" && (
                                            <div className="flex w-full items-center gap-3">
                                                {booking.otp && (
                                                    <div className="flex-1 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
                                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:block">Service OTP</span>
                                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider sm:hidden">OTP</span>
                                                        <span className="text-xl tracking-[0.2em] text-gray-900 font-mono font-bold bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-inner">{booking.otp}</span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleCancel(booking.id)}
                                                    disabled={cancellingId === booking.id}
                                                    className="px-5 py-2.5 text-sm font-bold border-2 border-red-100 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 disabled:opacity-50 transition-all ml-auto focus:ring-4 focus:ring-red-50"
                                                >
                                                    {cancellingId === booking.id ? "Cancelling..." : "Cancel Booking"}
                                                </button>
                                            </div>
                                        )}
                                        {booking.canRate && (
                                            <button onClick={() => { setSelectedBooking(booking); setShowRatingModal(true); }} className="px-5 py-2.5 text-sm font-bold bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:-translate-y-0.5 shadow-lg shadow-primary-600/30 transition-all flex items-center">
                                                <Star className="w-4 h-4 mr-2" fill="currentColor" />Rate Provider
                                            </button>
                                        )}
                                        {booking.isReviewed && (
                                            <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                                <span className="text-sm font-bold text-emerald-700 flex items-center"><CheckCircle className="w-4 h-4 mr-1.5" />Review Submitted</span>
                                            </div>
                                        )}
                                    </div>

                                    {booking.status === "Cancelled" && booking.rejectionReason && (
                                        <div className="mt-4 bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-xl p-4 flex gap-3 shadow-sm">
                                            <XCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-red-900 mb-1">Declined by Provider</p>
                                                <p className="text-sm text-red-800 leading-relaxed">{booking.rejectionReason}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredBookings.length === 0 && (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                        <Calendar className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings found</h3>
                                    <p className="text-sm text-gray-500 max-w-sm mx-auto">You have no {activeTab.toLowerCase()} bookings at the moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

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
