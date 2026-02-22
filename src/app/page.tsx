"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import Link from "next/link";
import { Search, MapPin, Star, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { PublicCityResponse } from "@/types/backend";

const services = [
    { name: "Plumbing", icon: "🔧", color: "bg-blue-100" },
    { name: "Electrical", icon: "⚡", color: "bg-yellow-100" },
    { name: "Painting", icon: "🎨", color: "bg-pink-100" },
    { name: "Cleaning", icon: "🧹", color: "bg-green-100" },
    { name: "Carpentry", icon: "🪚", color: "bg-green-100" },
    { name: "AC Repair", icon: "❄️", color: "bg-cyan-100" },
];

const features = [
    { icon: Shield, title: "Verified Providers", desc: "All professionals are background verified" },
    { icon: Clock, title: "Quick Response", desc: "Get service within hours of booking" },
    { icon: Star, title: "Quality Service", desc: "Rated 4.8/5 by satisfied customers" },
];

const topProviders = [
    { name: "Rajesh Kumar", service: "Plumbing", rating: 4.8, reviews: 124, image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Amit Singh", service: "Electrical", rating: 4.9, reviews: 89, image: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Priya Sharma", service: "Painting", rating: 4.7, reviews: 67, image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Deepak Verma", service: "AC Repair", rating: 4.8, reviews: 92, image: "https://randomuser.me/api/portraits/men/67.jpg" },
];

export default function HomePage() {
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedPincode, setSelectedPincode] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [citiesData, setCitiesData] = useState<PublicCityResponse[]>([]);

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

    // Derive pincodes from the selected city
    const pincodes = useMemo(() => {
        if (!selectedCity) return [];
        const city = citiesData.find((c) => c.cityName === selectedCity);
        return city?.pincodes || [];
    }, [selectedCity, citiesData]);

    // Reset pincode when city changes
    useEffect(() => {
        setSelectedPincode("");
    }, [selectedCity]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedCity) params.append("city", selectedCity);
        if (selectedPincode) params.append("pincode", selectedPincode);
        if (searchTerm) params.append("search", searchTerm);
        router.push(`/providers${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
                            Find Trusted Local Service Providers
                        </h1>
                        <p className="text-sm md:text-base text-primary-100 mb-6">
                            Book verified professionals for plumbing, electrical, painting, and more. Quick, reliable, and affordable.
                        </p>

                        {/* Service Finder */}
                        <div className="bg-white rounded-lg p-3 shadow-lg">
                            <div className="flex flex-col md:flex-row gap-2">
                                {/* City Dropdown */}
                                <div className="relative md:w-40">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition appearance-none bg-white"
                                    >
                                        <option value="">Select City</option>
                                        {citiesData.map((city) => (
                                            <option key={city.cityName} value={city.cityName}>{city.cityName}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Pincode Dropdown */}
                                <div className="relative md:w-36">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        value={selectedPincode}
                                        onChange={(e) => setSelectedPincode(e.target.value)}
                                        disabled={!selectedCity}
                                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                    >
                                        <option value="">{selectedCity ? "Select Pincode" : "Select City First"}</option>
                                        {pincodes.map((pin) => (
                                            <option key={pin.pincode} value={pin.pincode}>
                                                {pin.pincode}{pin.areaName ? ` - ${pin.areaName}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Service Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search for services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition"
                                    />
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-8 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center">Popular Services</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                        {services.map((service) => (
                            <Link
                                key={service.name}
                                href={`/providers?category=${service.name}`}
                                className={`${service.color} rounded-lg p-3 md:p-4 text-center hover:shadow-md transition-shadow`}
                            >
                                <span className="text-2xl md:text-3xl block mb-1">{service.icon}</span>
                                <span className="text-xs md:text-sm font-medium text-gray-800">{service.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.title} className="bg-white rounded-lg p-4 md:p-5 shadow-sm flex items-start">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                        <Icon className="w-5 h-5 text-primary-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-xs text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Top Providers */}
            <section className="py-8 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">Top Rated Providers</h2>
                        <Link href="/providers" className="text-primary-500 text-sm font-medium flex items-center hover:text-primary-600">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {topProviders.map((provider) => (
                            <Link key={provider.name} href="/providers/1" className="bg-gray-50 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                                <img src={provider.image} alt={provider.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full mx-auto mb-2" />
                                <h3 className="text-sm font-semibold text-gray-900 text-center truncate">{provider.name}</h3>
                                <p className="text-xs text-gray-500 text-center mb-2">{provider.service}</p>
                                <div className="flex items-center justify-center">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-medium ml-1">{provider.rating}</span>
                                    <span className="text-xs text-gray-400 ml-1">({provider.reviews})</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-12 bg-gradient-to-r from-primary-500 to-primary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-2">Ready to Get Started?</h2>
                    <p className="text-sm text-primary-100 mb-4">Join thousands of satisfied customers</p>
                    <Link href="/signup" className="inline-block bg-white text-primary-500 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        Sign Up Now
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
