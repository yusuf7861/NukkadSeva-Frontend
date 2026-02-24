"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { CustomerAddress } from "@/types/backend";
import { MapPin, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";

interface AddressSelectorProps {
    selectedAddressId: number | null;
    onSelectAddress: (id: number) => void;
}

export default function AddressSelector({ selectedAddressId, onSelectAddress }: AddressSelectorProps) {
    const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [type, setType] = useState("HOME");
    const [flatName, setFlatName] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const { data } = await api.get<CustomerAddress[]>("/customer/address");
            setAddresses(data);

            // Auto-select default if none selected
            if (!selectedAddressId && data.length > 0) {
                const defaultAddr = data.find(a => a.default) || data[0];
                onSelectAddress(defaultAddr.id);
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            const newAddr = { type, flatName, area, landmark, city, state, pincode, default: isDefault || addresses.length === 0 };
            const { data } = await api.post<CustomerAddress>("/customer/address", newAddr);
            setAddresses([...addresses, data]);
            onSelectAddress(data.id);
            setShowAddForm(false);
            toast.success("Address added successfully");

            // Reset form
            setFlatName(""); setArea(""); setLandmark(""); setCity(""); setState(""); setPincode("");
        } catch (error) {
            console.error("Failed to add address:", error);
            toast.error("Failed to add address");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-sm text-gray-500 py-2">Loading addresses...</div>;

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-medium text-gray-700">Service Address</label>
                {!showAddForm && (
                    <button type="button" onClick={() => setShowAddForm(true)} className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center">
                        <Plus className="w-3 h-3 mr-0.5" /> Add New
                    </button>
                )}
            </div>

            {showAddForm ? (
                <form onSubmit={handleAddAddress} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-500">Type</label>
                            <select value={type} onChange={e => setType(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none">
                                <option value="HOME">Home</option>
                                <option value="WORK">Work</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Pincode *</label>
                            <input required value={pincode} onChange={e => setPincode(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="e.g. 110001" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Flat/House No. (Optional)</label>
                        <input value={flatName} onChange={e => setFlatName(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Flat 101, Building A" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Area/Street *</label>
                        <input required value={area} onChange={e => setArea(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Sector 42, Main Road" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Landmark (Optional)</label>
                        <input value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Near Apollo Hospital" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-500">City *</label>
                            <input required value={city} onChange={e => setCity(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Delhi" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">State *</label>
                            <input required value={state} onChange={e => setState(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Delhi" />
                        </div>
                    </div>
                    {addresses.length > 0 && (
                        <div className="flex items-center">
                            <input type="checkbox" id="isDefault" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} className="rounded text-primary-500 focus:ring-primary-500" />
                            <label htmlFor="isDefault" className="ml-2 text-xs text-gray-600">Set as default address</label>
                        </div>
                    )}
                    <div className="flex gap-2 pt-1">
                        <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors">Cancel</button>
                        <button type="submit" disabled={saving} className="flex-1 py-1.5 text-xs font-medium text-white bg-primary-600 rounded hover:bg-primary-700 transition-colors disabled:opacity-50">
                            {saving ? "Saving..." : "Save Address"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {addresses.length === 0 ? (
                        <div className="text-xs text-gray-500 text-center py-4 bg-gray-50 rounded border border-dashed border-gray-300">
                            No saved addresses found. Please add one.
                        </div>
                    ) : (
                        addresses.map((addr) => (
                            <div
                                key={addr.id}
                                onClick={() => onSelectAddress(addr.id)}
                                className={`p-2 rounded-lg border cursor-pointer transition-all flex items-start gap-2 ${selectedAddressId === addr.id ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"}`}
                            >
                                <div className="mt-0.5 mt-0">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedAddressId === addr.id ? "border-primary-500 bg-primary-500 text-white" : "border-gray-300"}`}>
                                        {selectedAddressId === addr.id && <Check className="w-2.5 h-2.5" />}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-semibold text-gray-900 flex items-center">
                                            <MapPin className="w-3 h-3 mr-1 text-gray-500" /> {addr.type}
                                        </span>
                                        {addr.default && <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded">Default</span>}
                                    </div>
                                    <p className="text-xs text-gray-600 truncate leading-tight">
                                        {[addr.flatName, addr.area, addr.landmark, addr.city, addr.state, addr.pincode].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
