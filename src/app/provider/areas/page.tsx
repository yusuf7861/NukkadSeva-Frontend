"use client";

import { useState, useEffect, useMemo } from "react";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import api from "@/lib/api";
import { MapPin, Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { ProviderAreaResponse, PublicCityResponse } from "@/types/backend";

export default function ProviderAreasPage() {
    const [areas, setAreas] = useState<ProviderAreaResponse[]>([]);
    const [citiesData, setCitiesData] = useState<PublicCityResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [fetchError, setFetchError] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedPincodes, setSelectedPincodes] = useState<string[]>([]);

    useEffect(() => {
        fetchAreas();
        fetchCities();
    }, []);

    const fetchAreas = async () => {
        setIsLoading(true);
        setFetchError("");
        try {
            const { data } = await api.get<ProviderAreaResponse[]>("/provider/areas");
            setAreas(data);
        } catch (err) {
            console.error("Failed to fetch areas", err);
            setFetchError("We encountered an error loading your service areas.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCities = async () => {
        try {
            const { data } = await api.get<PublicCityResponse[]>("/public/providers/cities");
            setCitiesData(data);
        } catch (err) {
            console.error("Failed to fetch public cities", err);
        }
    };

    const availablePincodes = useMemo(() => {
        if (!selectedCity) return [];
        const city = citiesData.find((c) => c.cityName === selectedCity);
        return city?.pincodes || [];
    }, [selectedCity, citiesData]);

    const handlePincodeToggle = (pincode: string) => {
        setSelectedPincodes(prev =>
            prev.includes(pincode)
                ? prev.filter(p => p !== pincode)
                : [...prev, pincode]
        );
    };

    const handleAddArea = async () => {
        if (!selectedCity || selectedPincodes.length === 0) {
            setError("Please select a city and at least one pincode.");
            return;
        }

        setIsSaving(true);
        setError("");

        try {
            await api.post("/provider/areas", {
                city: selectedCity,
                pincodes: selectedPincodes
            });
            await fetchAreas();
            setIsModalOpen(false);
            setSelectedCity("");
            setSelectedPincodes([]);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add area.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveArea = async (areaId: number) => {
        if (!confirm("Are you sure you want to remove this service area? You will no longer receive bookings for these pincodes.")) {
            return;
        }

        try {
            await api.delete(`/provider/areas/${areaId}`);
            setAreas(prevAreas => prevAreas.filter(a => a.id !== areaId));
        } catch (err) {
            console.error("Failed to remove area", err);
        }
    };

    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Global Service Areas</h1>
                        <p className="text-gray-500 mt-1">Manage the locations where you are willing to travel for jobs. This applies to all your services.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
                    >
                        <Plus className="w-5 h-5" /> Add New Area
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                    </div>
                ) : fetchError ? (
                    <div className="bg-red-50 rounded-2xl border border-red-100 p-12 text-center shadow-sm">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to Load</h3>
                        <p className="text-red-700 max-w-sm mx-auto mb-6">
                            {fetchError} Please check your connection or try again.
                        </p>
                        <button
                            onClick={fetchAreas}
                            className="bg-red-100 text-red-800 hover:bg-red-200 font-medium px-6 py-2.5 rounded-xl transition"
                        >
                            Try Again
                        </button>
                    </div>
                ) : areas.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Service Areas Set</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">
                            You haven't defined any locations yet. Customers won't be able to find your services until you add at least one area.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium px-6 py-2.5 rounded-xl transition"
                        >
                            Add Your First Area
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areas.map(area => (
                            <div key={area.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{area.city}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveArea(area.id)}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
                                        title="Remove Area"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700">Active Pincodes ({area.pincodes.length})</p>
                                    <div className="flex flex-wrap gap-2">
                                        {area.pincodes.map(pin => (
                                            <span key={pin} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                                                {pin}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Area Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Add Service Area</h2>
                                <p className="text-sm text-gray-500 mt-1">Select a city and the specific pincodes you cover.</p>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1">
                                {error && (
                                    <div className="mb-4 p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select City</label>
                                        <select
                                            value={selectedCity}
                                            onChange={(e) => {
                                                setSelectedCity(e.target.value);
                                                setSelectedPincodes([]);
                                                setError("");
                                            }}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition"
                                        >
                                            <option value="">Choose a city...</option>
                                            {citiesData.map(c => (
                                                <option key={c.cityName} value={c.cityName}>{c.cityName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedCity && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Select active pincodes in {selectedCity}
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {availablePincodes.map(pin => (
                                                    <label
                                                        key={pin.pincode}
                                                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${selectedPincodes.includes(pin.pincode)
                                                            ? 'border-primary-500 bg-primary-50'
                                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                                            checked={selectedPincodes.includes(pin.pincode)}
                                                            onChange={() => handlePincodeToggle(pin.pincode)}
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-sm text-gray-900">{pin.pincode}</div>
                                                            <div className="text-xs text-gray-500 truncate w-24">{pin.areaName}</div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedCity("");
                                        setSelectedPincodes([]);
                                        setError("");
                                    }}
                                    className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddArea}
                                    disabled={isSaving || !selectedCity || selectedPincodes.length === 0}
                                    className="px-5 py-2.5 bg-primary-600 text-white font-medium hover:bg-primary-700 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Save Area
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
