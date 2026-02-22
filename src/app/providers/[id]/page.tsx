"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { DashboardProviderDto, BookingRequest, ServiceType, PaymentMethod } from "@/types/backend";
import { Star, MapPin, Phone, Clock, Shield, ChevronLeft, CheckCircle, MessageCircle, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProviderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuth();
    const [provider, setProvider] = useState<DashboardProviderDto | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<{ name: string, price: number, type: ServiceType, durationMinutes?: number } | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH_AFTER_SERVICE);
    const [bookingNote, setBookingNote] = useState("");
    const [isBooking, setIsBooking] = useState(false);

    // Mock services based on category since backend doesn't return detailed services list yet
    const getServicesForCategory = (category: string) => {
        const baseServices = [
            { name: "Consultation / Visitation", price: 199, type: ServiceType.REPAIRS },
        ];

        switch (category?.toUpperCase()) {
            case "PLUMBING":
                return [
                    ...baseServices,
                    { name: "Pipe Repair", price: 499, type: ServiceType.PLUMBING },
                    { name: "Installation", price: 999, type: ServiceType.PLUMBING }
                ];
            case "ELECTRICAL":
                return [
                    ...baseServices,
                    { name: "Wiring Check", price: 399, type: ServiceType.ELECTRICAL },
                    { name: "Switch Installation", price: 150, type: ServiceType.ELECTRICAL }
                ];
            case "CLEANING":
                return [
                    { name: "Full Home Cleaning", price: 1499, type: ServiceType.CLEANING },
                    { name: "Kitchen Cleaning", price: 799, type: ServiceType.CLEANING }
                ];
            default:
                return baseServices;
        }
    };

    useEffect(() => {
        fetchProvider();
    }, [params.id]);

    const fetchProvider = async () => {
        try {
            // Workaround: Fetch list and find by ID since public ID endpoint is missing
            const { data } = await api.get<{ providers: DashboardProviderDto[] }>("/public/providers", {
                params: { limit: 100 }
            });
            const found = data.providers.find((p: DashboardProviderDto) => p.id === Number(params.id));
            setProvider(found || null);

            // Fetch actual services for this provider
            const servicesResponse = await api.get<any[]>("/services/search", {
                params: { providerId: params.id }
            });

            if (servicesResponse.data && servicesResponse.data.length > 0) {
                const fetchedServices = servicesResponse.data.map(s => {
                    let mappedType = ServiceType.REPAIRS;
                    const cat = (s.category || "").trim().toUpperCase();
                    if (cat === "PLUMBING") mappedType = ServiceType.PLUMBING;
                    else if (cat === "CLEANING") mappedType = ServiceType.CLEANING;
                    else if (cat === "ELECTRICAL") mappedType = ServiceType.ELECTRICAL;
                    else if (cat === "PAINTING") mappedType = ServiceType.PAINTING;
                    else if (cat === "APPLIANCE REPAIR") mappedType = ServiceType.APPLIANCE_REPAIRS;
                    else if (cat === "CARPENTRY") mappedType = ServiceType.CARPENTRY;
                    else if (cat === "BEAUTY & WELLNESS" || cat === "PEST CONTROL" || cat === "GARDENING" || cat === "MOVING & PACKING") mappedType = ServiceType.REPAIRS;

                    return {
                        id: s.id,
                        name: s.name,
                        price: s.price,
                        type: mappedType,
                        durationMinutes: s.durationMinutes,
                        description: s.description
                    };
                });
                setServices(fetchedServices);
                setSelectedService(fetchedServices[0]);
            } else if (found) {
                // Fallback to mock services if no active services exist
                const mockServices = getServicesForCategory(found.serviceCategory);
                setServices(mockServices);
                setSelectedService(mockServices[0]);
            }
        } catch (error) {
            console.error("Failed to fetch provider details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!provider || !selectedService || !selectedDate || !selectedTime) return;

        setIsBooking(true);
        try {
            // Combine date and time
            const bookingDateTime = `${selectedDate}T${selectedTime}:00`;

            const bookingRequest: BookingRequest = {
                providerId: provider.id,
                serviceType: selectedService.type,
                bookingDateTime: bookingDateTime,
                priceEstimate: selectedService.price,
                finalPrice: selectedService.price, // Assuming fixed price for now
                paymentMethod: paymentMethod,
                note: bookingNote
            };

            await api.post("/booking", bookingRequest);
            alert("Booking created successfully!");
            router.push("/bookings");
        } catch (error) {
            console.error("Booking failed", error);
            alert("Failed to create booking. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading provider details...</div>;
    if (!provider) return <div className="p-10 text-center">Provider not found</div>;
    // Mock availability
    const availability = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

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
                                <img src={provider.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"} alt={provider.fullName} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-lg font-bold text-gray-900">{provider.businessName || provider.fullName}</h1>
                                        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center"><Shield className="w-3 h-3 mr-1" />Verified</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{provider.serviceCategory}</p>
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                                        <span className="flex items-center"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />4.8 (120 reviews)</span>
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{provider.experience} Yrs Exp.</span>
                                    </div>
                                    <p className="flex items-center mt-2 text-xs text-gray-500"><MapPin className="w-3 h-3 mr-1" />{provider.serviceArea}</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-900 mb-2">About</h2>
                            <p className="text-sm text-gray-600">{provider.bio || "No details available."}</p>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-900 mb-3">Services</h2>
                            <div className="space-y-2">
                                {services.map((s) => (
                                    <div key={s.name} onClick={() => setSelectedService(s)} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${selectedService?.name === s.name ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:bg-gray-50"}`}>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{s.name}</p>
                                            {s.durationMinutes && <p className="text-xs text-gray-500">{s.durationMinutes} mins</p>}
                                        </div>
                                        <p className="text-sm font-semibold text-primary-500">₹{s.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-4 shadow-sm sticky top-16">
                            <h2 className="text-sm font-semibold text-gray-900 mb-3">Book Service</h2>

                            {selectedService && (
                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <p className="text-xs text-gray-500">Selected</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedService.name}</p>
                                    <p className="text-sm font-semibold text-primary-500">₹{selectedService.price}</p>
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Time Slot</label>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {availability.map((t) => (
                                        <button key={t} onClick={() => setSelectedTime(t)} className={`py-1.5 rounded text-xs font-medium transition-colors ${selectedTime === t ? "bg-primary-500 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500">
                                    <option value={PaymentMethod.CASH_AFTER_SERVICE}>Cash After Service</option>
                                    <option value={PaymentMethod.UPI}>UPI</option>
                                    <option value={PaymentMethod.CREDIT_CARD}>Credit Card</option>
                                    <option value={PaymentMethod.DEBIT_CARD}>Debit Card</option>
                                    <option value={PaymentMethod.NET_BANKING}>Net Banking</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Note (Optional)</label>
                                <textarea value={bookingNote} onChange={(e) => setBookingNote(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" placeholder="Any specific requirements..."></textarea>
                            </div>

                            <button onClick={handleBooking} disabled={!selectedDate || !selectedTime || isBooking} className="w-full bg-primary-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                                {isBooking ? "Booking..." : "Confirm Booking"}
                            </button>

                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                <a href={`tel:${provider.mobileNumber}`} className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <Phone className="w-4 h-4 mr-2" />{provider.mobileNumber}
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
