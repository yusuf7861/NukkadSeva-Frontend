"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Star, MapPin, Phone, Clock, Shield, ChevronLeft, CheckCircle, MessageCircle } from "lucide-react";

const provider = {
    id: 1, name: "Rajesh Kumar", service: "Plumbing Expert", rating: 4.8, reviews: 124, experience: "8 years", completedJobs: 450,
    image: "https://randomuser.me/api/portraits/men/32.jpg", location: "Sector 18, Noida", phone: "+91 9876543210", verified: true,
    about: "Professional plumber with 8+ years of experience. Specialized in pipe fitting, leak repairs, bathroom installations.",
    services: [
        { name: "Pipe Repair", price: 299, duration: "1-2 hrs" },
        { name: "Leak Detection", price: 199, duration: "30-60 min" },
        { name: "Bathroom Installation", price: 1499, duration: "4-6 hrs" },
        { name: "Water Heater Service", price: 499, duration: "1-2 hrs" },
    ],
    availability: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
    reviewsList: [
        { id: 1, name: "Ankit Sharma", rating: 5, date: "Feb 1", comment: "Excellent work! Fixed our leak quickly." },
        { id: 2, name: "Priya Gupta", rating: 4, date: "Jan 28", comment: "Good service. Arrived on time." },
    ],
};

export default function ProviderDetailPage() {
    const [selectedService, setSelectedService] = useState(provider.services[0]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                <nav className="mb-4">
                    <Link href="/providers" className="text-primary-500 hover:text-primary-600 flex items-center text-sm">
                        <ChevronLeft className="w-4 h-4 mr-1" />Back to Providers
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Provider Info */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Header Card */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <img src={provider.image} alt={provider.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-lg font-bold text-gray-900">{provider.name}</h1>
                                        {provider.verified && <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center"><Shield className="w-3 h-3 mr-1" />Verified</span>}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{provider.service}</p>
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                                        <span className="flex items-center"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />{provider.rating} ({provider.reviews})</span>
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{provider.experience}</span>
                                        <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500" />{provider.completedJobs} jobs</span>
                                    </div>
                                    <p className="flex items-center mt-2 text-xs text-gray-500"><MapPin className="w-3 h-3 mr-1" />{provider.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-900 mb-2">About</h2>
                            <p className="text-sm text-gray-600">{provider.about}</p>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-900 mb-3">Services</h2>
                            <div className="space-y-2">
                                {provider.services.map((s) => (
                                    <div key={s.name} onClick={() => setSelectedService(s)} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${selectedService.name === s.name ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:bg-gray-50"}`}>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{s.name}</p>
                                            <p className="text-xs text-gray-500">{s.duration}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-primary-500">₹{s.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold text-gray-900">Reviews</h2>
                                <span className="flex items-center text-xs"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />{provider.rating} ({provider.reviews})</span>
                            </div>
                            <div className="space-y-3">
                                {provider.reviewsList.map((r) => (
                                    <div key={r.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-xs font-medium text-gray-600">{r.name[0]}</div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                                                    <p className="text-xs text-gray-500">{r.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />)}</div>
                                        </div>
                                        <p className="text-sm text-gray-600">{r.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-4 shadow-sm sticky top-16">
                            <h2 className="text-sm font-semibold text-gray-900 mb-3">Book Service</h2>

                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-xs text-gray-500">Selected</p>
                                <p className="text-sm font-medium text-gray-900">{selectedService.name}</p>
                                <p className="text-sm font-semibold text-primary-500">₹{selectedService.price}</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Time Slot</label>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {provider.availability.map((t) => (
                                        <button key={t} onClick={() => setSelectedTime(t)} className={`py-1.5 rounded text-xs font-medium transition-colors ${selectedTime === t ? "bg-primary-500 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button disabled={!selectedDate || !selectedTime} className="w-full bg-primary-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed">
                                Confirm Booking
                            </button>

                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <MessageCircle className="w-4 h-4 mr-2" />Contact
                                </button>
                                <a href={`tel:${provider.phone}`} className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <Phone className="w-4 h-4 mr-2" />{provider.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
