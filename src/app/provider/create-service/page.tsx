"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PublicCityResponse } from "@/types/backend";

export default function CreateServicePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [citiesData, setCitiesData] = useState<PublicCityResponse[]>([]);
    const [selectedCity, setSelectedCity] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        durationMinutes: "",
        pincodes: [] as string[],
    });

    const categories = [
        "Plumbing",
        "Electrical",
        "Carpentry",
        "Cleaning",
        "Painting",
        "Appliance Repair",
        "Pest Control",
        "Beauty & Wellness",
        "Gardening",
        "Moving & Packing"
    ];

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
    const availablePincodes = useMemo(() => {
        if (!selectedCity) return [];
        const city = citiesData.find((c) => c.cityName === selectedCity);
        return city?.pincodes || [];
    }, [selectedCity, citiesData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        setFormData(prev => ({ ...prev, pincodes: [] })); // clear pincodes if city changes
    };

    const handlePincodeToggle = (pincode: string) => {
        setFormData(prev => {
            const isSelected = prev.pincodes.includes(pincode);
            if (isSelected) {
                return { ...prev, pincodes: prev.pincodes.filter(p => p !== pincode) };
            } else {
                return { ...prev, pincodes: [...prev.pincodes, pincode] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        if (!formData.name || !formData.category || !formData.price || !formData.durationMinutes) {
            setError("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/services", {
                ...formData,
                price: parseFloat(formData.price),
                durationMinutes: parseInt(formData.durationMinutes),
                isActive: true,
                pincodes: formData.pincodes
            });
            setSuccess(true);
            setTimeout(() => {
                router.push("/provider/dashboard");
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/provider/dashboard"
                            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Create New Service</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            Service created successfully! Redirecting...
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Service Details</h2>

                        <div className="grid gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Full House Deep Cleaning"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition appearance-none bg-white"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe what's included in this service..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Duration */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Pricing & Time</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (Minutes) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="durationMinutes"
                                    name="durationMinutes"
                                    min="15"
                                    step="15"
                                    value={formData.durationMinutes}
                                    onChange={handleChange}
                                    placeholder="e.g. 60"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Serviceable Locations */}
                        <div className="pt-4 mt-6 border-t border-gray-100 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-500" /> Service Location
                            </h2>
                            <p className="text-sm text-gray-500">Pick where you can offer this service.</p>

                            <div className="md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition appearance-none bg-white"
                                    >
                                        <option value="">Select a city</option>
                                        {citiesData.map((city) => (
                                            <option key={city.cityName} value={city.cityName}>{city.cityName}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {selectedCity && availablePincodes.length > 0 && (
                                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Area Pincodes <span className="text-xs text-gray-500 font-normal">(Leave all unchecked to service ALL areas in {selectedCity})</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {availablePincodes.map((pin) => (
                                            <label
                                                key={pin.pincode}
                                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.pincodes.includes(pin.pincode)
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.pincodes.includes(pin.pincode)}
                                                    onChange={() => handlePincodeToggle(pin.pincode)}
                                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900">{pin.pincode}</span>
                                                    <span className="text-xs text-gray-500">{pin.areaName}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>


                    <div className="pt-6 flex items-center justify-end gap-3 border-t border-gray-100">
                        <Link
                            href="/provider/dashboard"
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Create Service
                        </button>
                    </div>

                </form >
            </main >
        </div >
    );
}
