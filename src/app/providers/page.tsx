"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import api from "@/lib/api";
import { DashboardProviderDto, PublicCityResponse } from "@/types/backend";
import { Search, MapPin, Filter, Star, Grid, List, Shield } from "lucide-react";

const categories = ["All", "Plumbing", "Electrical", "Painting", "Cleaning", "Carpentry", "AC Repair"];

function ProvidersContent() {
    const searchParams = useSearchParams();
    const [services, setServices] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [citiesData, setCitiesData] = useState<PublicCityResponse[]>([]);
    const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
    const [selectedPincode, setSelectedPincode] = useState(searchParams.get("pincode") || "");

    // Fetch cities on mount
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await api.get<PublicCityResponse[]>("/public/providers/cities");
                setCitiesData(data);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            }
        };
        fetchCities();
    }, []);

    // Derive pincodes from selected city
    const pincodes = useMemo(() => {
        if (!selectedCity) return [];
        const city = citiesData.find((c) => c.cityName === selectedCity);
        return city?.pincodes || [];
    }, [selectedCity, citiesData]);

    // Reset pincode when city changes
    useEffect(() => {
        setSelectedPincode("");
    }, [selectedCity]);

    useEffect(() => {
        fetchServices();
    }, [selectedCategory, selectedCity, selectedPincode]);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const params: any = {};
            if (selectedCategory !== "All") params.category = selectedCategory;
            if (selectedCity) params.city = selectedCity;
            if (selectedPincode) params.pincode = selectedPincode;

            const { data } = await api.get<any[]>("/services/search", { params });
            setServices(data || []);
        } catch (error) {
            console.error("Failed to fetch services", error);
            setServices([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredServices = services.filter((s) => {
        // Client-side search and filtering
        const matchesSearch = (s.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.providerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.category || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                {/* Search Header */}
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex items-center px-3 py-2 border border-gray-300 rounded-lg">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-sm outline-none" />
                        </div>

                        {/* City Dropdown */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="w-full sm:w-36 pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm outline-none appearance-none bg-white"
                            >
                                <option value="">All Cities</option>
                                {citiesData.map((city) => (
                                    <option key={city.cityName} value={city.cityName}>{city.cityName}</option>
                                ))}
                            </select>
                        </div>

                        {/* Pincode Dropdown */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedPincode}
                                onChange={(e) => setSelectedPincode(e.target.value)}
                                disabled={!selectedCity}
                                className="w-full sm:w-44 pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm outline-none appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                <option value="">{selectedCity ? "All Pincodes" : "Select City First"}</option>
                                {pincodes.map((pin) => (
                                    <option key={pin.pincode} value={pin.pincode}>
                                        {pin.pincode}{pin.areaName ? ` - ${pin.areaName}` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            <Filter className="w-4 h-4 mr-1" />Filters
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar Filters */}
                    <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:w-48 flex-shrink-0`}>
                        <div className="bg-white rounded-lg p-3 shadow-sm sticky top-16">
                            <h3 className="text-xs font-semibold text-gray-900 mb-2">Categories</h3>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${selectedCategory === cat ? "bg-primary-50 text-primary-500 font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-xs font-semibold text-gray-900 mt-4 mb-2">Rating</h3>
                            <div className="space-y-1">
                                {[4, 3, 2].map((rating) => (
                                    <label key={rating} className="flex items-center text-xs text-gray-600">
                                        <input type="checkbox" className="mr-2 rounded" />
                                        {rating}+ <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-gray-600"><span className="font-medium text-gray-900">{filteredServices.length}</span> services</p>
                            <div className="flex items-center space-x-2">
                                <select className="px-2 py-1.5 border border-gray-300 rounded text-xs">
                                    <option>Recommended</option>
                                    <option>Rating</option>
                                    <option>Price: Low to High</option>
                                </select>
                                <div className="flex border border-gray-300 rounded overflow-hidden">
                                    <button onClick={() => setViewMode("grid")} className={`p-1.5 ${viewMode === "grid" ? "bg-primary-50 text-primary-500" : "text-gray-500"}`}>
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setViewMode("list")} className={`p-1.5 ${viewMode === "list" ? "bg-primary-50 text-primary-500" : "text-gray-500"}`}>
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-10">Loading...</div>
                        ) : (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-4"}>
                                {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => (
                                        <Link key={service.id} href={`/providers/${service.providerId}`} className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group ${viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
                                            {/* Service Image Placeholder (Optional) / Icon */}
                                            <div className={`${viewMode === "list" ? "w-full sm:w-48 h-32 sm:h-auto" : "h-32 w-full"} bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center relative`}>
                                                <div className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-300">
                                                    <Grid className="w-8 h-8" />
                                                </div>
                                                {service.providerVerified && (
                                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                                                        <Shield className="w-3 h-3 mr-1" />
                                                        VERIFIED
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-4 flex flex-col flex-1">
                                                <div className="flex justify-between items-start mb-2 gap-2">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 md:line-clamp-1 group-hover:text-primary-600 transition-colors">{service.name}</h3>
                                                        <p className="text-xs text-primary-500 font-medium">{service.category}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-100">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Starts From</span>
                                                        <div className="flex items-center gap-1.5 text-gray-900">
                                                            <span className="text-base font-bold">₹{service.price}</span>
                                                            {service.durationMinutes && (
                                                                <span className="text-xs text-gray-500">/ {service.durationMinutes}m</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] text-gray-500 block mb-0.5">Offered by</span>
                                                        <span className="text-xs font-medium text-gray-700 truncate max-w-[120px] block">{service.providerName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10 text-gray-500">No services found.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ProvidersPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading providers...</div>}>
            <ProvidersContent />
        </Suspense>
    );
}
