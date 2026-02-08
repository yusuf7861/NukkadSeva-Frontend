"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RatingModal from "@/components/RatingModal";
import { Calendar, Clock, MapPin, Phone, Star, CheckCircle, XCircle } from "lucide-react";

const bookings = [
    { id: 1, service: "Plumbing Repair", provider: "Rajesh Kumar", providerImage: "https://randomuser.me/api/portraits/men/32.jpg", date: "Feb 5, 2026", time: "10:00 AM", address: "123 Main St, Noida", phone: "+91 9876543210", status: "Completed", amount: 599, canRate: true },
    { id: 2, service: "Electrical Work", provider: "Amit Singh", providerImage: "https://randomuser.me/api/portraits/men/44.jpg", date: "Feb 3, 2026", time: "2:00 PM", address: "456 Park Ave, Delhi", phone: "+91 9876543211", status: "Completed", amount: 899, canRate: false },
    { id: 3, service: "House Painting", provider: "Priya Sharma", providerImage: "https://randomuser.me/api/portraits/women/65.jpg", date: "Feb 10, 2026", time: "9:00 AM", address: "789 Garden Rd, Ghaziabad", phone: "+91 9876543212", status: "Upcoming", amount: 2499, canRate: false },
    { id: 4, service: "AC Servicing", provider: "Deepak Verma", providerImage: "https://randomuser.me/api/portraits/men/67.jpg", date: "Jan 28, 2026", time: "11:00 AM", address: "321 Tech Park, Rohini", phone: "+91 9876543213", status: "Cancelled", amount: 499, canRate: false },
];

const tabs = ["All", "Upcoming", "Completed", "Cancelled"];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);

    const filteredBookings = bookings.filter((b) => activeTab === "All" || b.status === activeTab);

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
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-sm text-gray-500">Track all your service bookings</p>
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
                <div className="space-y-3">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <img src={booking.providerImage} alt={booking.provider} className="w-10 h-10 rounded-full object-cover" />
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
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                    <p className="text-sm font-semibold text-gray-900 mt-1">₹{booking.amount}</p>
                                </div>
                            </div>

                            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100 space-x-2">
                                {booking.status === "Upcoming" && (
                                    <>
                                        <button className="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50">Cancel</button>
                                        <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Reschedule</button>
                                    </>
                                )}
                                {booking.canRate && (
                                    <button onClick={() => { setSelectedBooking(booking); setShowRatingModal(true); }} className="px-3 py-1.5 text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center">
                                        <Star className="w-3 h-3 mr-1" />Rate
                                    </button>
                                )}
                                {!booking.canRate && booking.status === "Completed" && (
                                    <span className="text-xs text-gray-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500" />Rated</span>
                                )}
                            </div>
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

                {selectedBooking && (
                    <RatingModal isOpen={showRatingModal} onClose={() => setShowRatingModal(false)} providerName={selectedBooking.provider} serviceName={selectedBooking.service} />
                )}
            </main>
        </div>
    );
}
