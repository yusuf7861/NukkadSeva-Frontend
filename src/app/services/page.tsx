"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { Search, MapPin, Filter, Star, Clock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    durationMinutes: number;
    providerName: string;
    providerId: number;
    pincodes: string[];
    providerVerified: boolean;
}

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
    const [selectedPincode, setSelectedPincode] = useState(searchParams.get("pincode") || "");
    const [cities, setCities] = useState<string[]>([]);
    const [pincodes, setPincodes] = useState<string[]>([]);

    const fetchServices = async (city?: string, pincode?: string) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (city) params.append("city", city);
            if (pincode) params.append("pincode", pincode);

            const endpoint = (city || pincode) ? `/services/search?${params.toString()}` : "/services";
            const { data } = await api.get<Service[]>(endpoint);
            setServices(data);
        } catch (err) {
            console.error("Failed to fetch services", err);
            setError("Failed to load services. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await api.get<string[]>("/public/providers/cities");
                setCities(data);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const fetchPincodes = async () => {
            if (!selectedCity) {
                setPincodes([]);
                return;
            }
            try {
                const { data } = await api.get<string[]>(`/public/providers/pincodes?city=${selectedCity}`);
                setPincodes(data);
            } catch (error) {
                console.error("Failed to fetch pincodes", error);
            }
        };
        fetchPincodes();
    }, [selectedCity]);

    // Reset pincode only if the current pincode is invalid for the new city? 
    // Or just let the user re-select. For now, if city changes, maybe clear pincode if it's not in the new list.
    // However, if coming from URL, we want to keep it.
    // The previous implementation in HomePage cleared it. Here, let's just fetch pincodes.

    useEffect(() => {
        const cityParam = searchParams.get("city") || "";
        const pincodeParam = searchParams.get("pincode") || "";
        // If params provided, they depend on cities/pincodes being loaded? No, search doesn't strictly need the dropdown options to exist to fire.
        fetchServices(cityParam || undefined, pincodeParam || undefined);
    }, []);

    const handleSearch = () => {
        fetchServices(selectedCity, selectedPincode);
    };

    const categories = ["All", ...Array.from(new Set(services.map(s => s.category)))];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const { user } = useAuth();
    const router = useRouter();

    const handleBook = (serviceId: number) => {
        if (!user) {
            router.push(`/login?redirect=/services`);
            return;
        }
        // TODO: Implement actual booking logic here
        console.log("Proceed to booking for service:", serviceId);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
                {/* Header & Search */}
                <div className="mb-8 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Find Services</h1>
                        <p className="text-gray-500 mt-2">Book trusted professionals for all your home needs.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative md:w-48">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedCity}
                                onChange={(e) => {
                                    setSelectedCity(e.target.value);
                                    setSelectedPincode(""); // Clear pincode on city change
                                }}
                                className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition appearance-none bg-white"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative md:w-48">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedPincode}
                                onChange={(e) => setSelectedPincode(e.target.value)}
                                disabled={!selectedCity}
                                className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                <option value="">{selectedCity ? "Select Pincode" : "Select City First"}</option>
                                {pincodes.map((pin) => (
                                    <option key={pin} value={pin}>{pin}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition"
                            />
                        </div>
                        <div className="relative md:w-48">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition appearance-none bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition shadow-sm whitespace-nowrap"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8" />
                        <p>{error}</p>
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg font-medium">No services found.</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                            {service.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>4.8</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition mb-2">
                                        {service.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                                        {service.description || "No description provided."}
                                    </p>

                                    {/* Provider Info */}
                                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                                            {service.providerName.charAt(0)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>{service.providerName}</span>
                                            {service.providerVerified && (
                                                <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium uppercase">Price</span>
                                            <span className="text-lg font-bold text-gray-900">₹{service.price}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-gray-400 font-medium uppercase flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Duration
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700">{service.durationMinutes} mins</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-2">
                                    <button
                                        onClick={() => handleBook(service.id)}
                                        className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-primary-600 transition shadow-sm"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
