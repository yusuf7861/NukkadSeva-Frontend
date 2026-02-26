"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
    MapPin, Plus, Trash2, ToggleLeft, ToggleRight, Loader2, X, ChevronDown, ChevronUp,
} from "lucide-react";

interface Pincode {
    id: number;
    pincode: string;
    areaName: string;
    isActive: boolean;
}

interface City {
    id: number;
    cityName: string;
    state: string;
    isActive: boolean;
    pincodes: Pincode[];
}

export default function CitiesPage() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddCity, setShowAddCity] = useState(false);
    const [expandedCity, setExpandedCity] = useState<number | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Add city form
    const [cityName, setCityName] = useState("");
    const [state, setState] = useState("");
    const [pincodes, setPincodes] = useState([{ pincode: "", areaName: "" }]);

    // Add pincode form
    const [addPincodeCity, setAddPincodeCity] = useState<number | null>(null);
    const [newPincodes, setNewPincodes] = useState([{ pincode: "", areaName: "" }]);

    const fetchCities = async () => {
        try {
            const { data } = await api.get("/public/providers/cities");
            setCities(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCities(); }, []);

    const handleAddCity = async () => {
        if (!cityName.trim() || !state.trim()) { toast.error("City name and state are required"); return; }
        const validPincodes = pincodes.filter(p => p.pincode.trim());
        if (validPincodes.length === 0) { toast.error("Add at least one pincode"); return; }
        setActionLoading("addCity");
        try {
            await api.post("/admin/cities", {
                cityName: cityName.trim(),
                state: state.trim(),
                pincodes: validPincodes,
            });
            toast.success("City added successfully!");
            setCityName(""); setState(""); setPincodes([{ pincode: "", areaName: "" }]);
            setShowAddCity(false);
            fetchCities();
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to add city");
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggleCity = async (cityId: number, currentStatus: boolean) => {
        setActionLoading(`toggle-${cityId}`);
        try {
            await api.patch(`/admin/cities/${cityId}/status`, { isActive: !currentStatus });
            toast.success(`City ${!currentStatus ? "activated" : "deactivated"}`);
            fetchCities();
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to toggle status");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteCity = async (cityId: number) => {
        if (!confirm("Are you sure you want to delete this city? All associated pincodes will also be deleted.")) return;
        setActionLoading(`delete-${cityId}`);
        try {
            await api.delete(`/admin/cities/${cityId}`);
            toast.success("City deleted");
            fetchCities();
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to delete");
        } finally {
            setActionLoading(null);
        }
    };

    const handleAddPincodes = async (cityId: number) => {
        const valid = newPincodes.filter(p => p.pincode.trim());
        if (valid.length === 0) { toast.error("Add at least one pincode"); return; }
        setActionLoading(`addPin-${cityId}`);
        try {
            await api.post(`/admin/cities/${cityId}/pincodes`, valid);
            toast.success("Pincodes added!");
            setAddPincodeCity(null);
            setNewPincodes([{ pincode: "", areaName: "" }]);
            fetchCities();
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to add pincodes");
        } finally {
            setActionLoading(null);
        }
    };

    const addPincodeRow = (arr: typeof pincodes, setter: typeof setPincodes) => {
        setter([...arr, { pincode: "", areaName: "" }]);
    };

    const updatePincodeRow = (arr: typeof pincodes, setter: typeof setPincodes, index: number, field: string, value: string) => {
        const updated = [...arr];
        (updated[index] as any)[field] = value;
        setter(updated);
    };

    const removePincodeRow = (arr: typeof pincodes, setter: typeof setPincodes, index: number) => {
        if (arr.length <= 1) return;
        setter(arr.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cities & Pincodes</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage service areas for your platform</p>
                </div>
                <button
                    onClick={() => setShowAddCity(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add City
                </button>
            </div>

            {/* City List */}
            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>
            ) : cities.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No cities added yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {cities.map((city) => (
                        <div key={city.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4">
                                <button
                                    onClick={() => setExpandedCity(expandedCity === city.id ? null : city.id)}
                                    className="flex items-center gap-3 flex-1 text-left"
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${city.isActive ? "bg-emerald-50" : "bg-gray-100"}`}>
                                        <MapPin className={`w-4 h-4 ${city.isActive ? "text-emerald-600" : "text-gray-400"}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{city.cityName}</p>
                                        <p className="text-xs text-gray-500">{city.state} · {city.pincodes?.length || 0} pincodes</p>
                                    </div>
                                    {expandedCity === city.id ? <ChevronUp className="w-4 h-4 text-gray-400 ml-2" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />}
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${city.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                                        {city.isActive ? "Active" : "Inactive"}
                                    </span>
                                    <button
                                        onClick={() => handleToggleCity(city.id, city.isActive)}
                                        disabled={actionLoading === `toggle-${city.id}`}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                                        title={city.isActive ? "Deactivate" : "Activate"}
                                    >
                                        {city.isActive ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCity(city.id)}
                                        disabled={actionLoading === `delete-${city.id}`}
                                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-600"
                                        title="Delete city"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {expandedCity === city.id && (
                                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
                                    {city.pincodes?.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
                                            {city.pincodes.map((pin) => (
                                                <div key={pin.id} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg text-xs border border-gray-100">
                                                    <span className="font-mono font-semibold text-gray-700">{pin.pincode}</span>
                                                    {pin.areaName && <span className="text-gray-400">· {pin.areaName}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 mb-3">No pincodes added</p>
                                    )}
                                    <button
                                        onClick={() => setAddPincodeCity(city.id)}
                                        className="text-xs text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Pincodes
                                    </button>

                                    {addPincodeCity === city.id && (
                                        <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200">
                                            {newPincodes.map((p, i) => (
                                                <div key={i} className="flex gap-2 mb-2">
                                                    <input
                                                        placeholder="Pincode"
                                                        value={p.pincode}
                                                        onChange={(e) => updatePincodeRow(newPincodes, setNewPincodes, i, "pincode", e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                                    />
                                                    <input
                                                        placeholder="Area name"
                                                        value={p.areaName}
                                                        onChange={(e) => updatePincodeRow(newPincodes, setNewPincodes, i, "areaName", e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                                    />
                                                    {newPincodes.length > 1 && (
                                                        <button onClick={() => removePincodeRow(newPincodes, setNewPincodes, i)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="flex justify-between mt-2">
                                                <button onClick={() => addPincodeRow(newPincodes, setNewPincodes)} className="text-xs text-primary-600 font-medium">+ Add row</button>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setAddPincodeCity(null); setNewPincodes([{ pincode: "", areaName: "" }]); }} className="text-xs text-gray-500">Cancel</button>
                                                    <button
                                                        onClick={() => handleAddPincodes(city.id)}
                                                        disabled={actionLoading === `addPin-${city.id}`}
                                                        className="px-3 py-1.5 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 disabled:opacity-50"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add City Modal */}
            {showAddCity && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Add New City</h3>
                        <p className="text-sm text-gray-500 mb-5">Configure a new serviceable city with pincodes</p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">City Name</label>
                                    <input value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="e.g. Mumbai" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                                    <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Pincodes</label>
                                {pincodes.map((p, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input placeholder="Pincode" value={p.pincode} onChange={(e) => updatePincodeRow(pincodes, setPincodes, i, "pincode", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                                        <input placeholder="Area name (optional)" value={p.areaName} onChange={(e) => updatePincodeRow(pincodes, setPincodes, i, "areaName", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                                        {pincodes.length > 1 && <button onClick={() => removePincodeRow(pincodes, setPincodes, i)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
                                    </div>
                                ))}
                                <button onClick={() => addPincodeRow(pincodes, setPincodes)} className="text-xs text-primary-600 font-medium mt-1">+ Add another pincode</button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button onClick={() => setShowAddCity(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                            <button onClick={handleAddCity} disabled={actionLoading === "addCity"} className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50">
                                {actionLoading === "addCity" ? "Adding..." : "Add City"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
