"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { CustomerAddress } from "@/types/backend";
import { MapPin, Plus, Trash2, Home, Briefcase, Map } from "lucide-react";
import toast from "react-hot-toast";

export default function AddressManager() {
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

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this address?")) return;
        try {
            await api.delete(`/customer/address/${id}`);
            setAddresses(addresses.filter(a => a.id !== id));
            toast.success("Address deleted");
        } catch (error) {
            console.error("Failed to delete address:", error);
            toast.error("Failed to delete address");
        }
    };

    const handleSetDefault = async (id: number) => {
        try {
            await api.put(`/customer/address/${id}/default`);
            setAddresses(addresses.map(a => ({ ...a, default: a.id === id })));
            toast.success("Default address updated");
        } catch (error) {
            console.error("Failed to set default address:", error);
            toast.error("Failed to update default address");
        }
    };

    const getIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case "HOME": return <Home className="w-4 h-4 text-primary-500" />;
            case "WORK": return <Briefcase className="w-4 h-4 text-blue-500" />;
            default: return <Map className="w-4 h-4 text-emerald-500" />;
        }
    };

    if (loading) return <div className="text-sm text-gray-500 py-4 text-center">Loading addresses...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">Saved Addresses</h3>
                    <p className="text-xs text-gray-500 mt-1">Manage your service locations</p>
                </div>
                {!showAddForm && (
                    <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-primary-600 hover:bg-gray-50 transition-colors shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add New Address
                    </button>
                )}
            </div>

            {showAddForm && (
                <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-xl border border-primary-100 shadow-sm space-y-4">
                    <h4 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">Add New Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Address Type</label>
                            <select value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                <option value="HOME">Home</option>
                                <option value="WORK">Work</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Pincode *</label>
                            <input required value={pincode} onChange={e => setPincode(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 110001" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Flat/House No. (Optional)</label>
                        <input value={flatName} onChange={e => setFlatName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Flat 101, Building A" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Area/Street *</label>
                        <input required value={area} onChange={e => setArea(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Sector 42, Main Road" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Landmark (Optional)</label>
                        <input value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Near Apollo Hospital" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">City *</label>
                            <input required value={city} onChange={e => setCity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Delhi" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">State *</label>
                            <input required value={state} onChange={e => setState(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Delhi" />
                        </div>
                    </div>
                    {addresses.length > 0 && (
                        <div className="flex items-center pt-2">
                            <input type="checkbox" id="isDefault" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} className="rounded text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer" />
                            <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700 cursor-pointer">Set as default service address</label>
                        </div>
                    )}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" disabled={saving} className="px-4 py-2 flex-1 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-center">
                            {saving ? "Saving..." : "Save Address"}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`p-4 rounded-xl border relative transition-shadow hover:shadow-md ${addr.default ? "border-primary-200 bg-primary-50/30" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-gray-50 rounded-md border border-gray-100">
                                    {getIcon(addr.type)}
                                </div>
                                <span className="text-sm font-bold text-gray-900">{addr.type}</span>
                                {addr.default && (
                                    <span className="ml-2 text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-primary-200">Default</span>
                                )}
                            </div>
                            <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Address">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1 pl-[34px]">
                            {addr.flatName && <p>{addr.flatName}</p>}
                            <p>{addr.area}</p>
                            {addr.landmark && <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Landmark: {addr.landmark}</p>}
                            <p>{addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span></p>
                        </div>

                        {!addr.default && (
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                <button onClick={() => handleSetDefault(addr.id)} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                                    Set as Default
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {addresses.length === 0 && !showAddForm && (
                <div className="text-center py-10 bg-white border border-gray-200 border-dashed rounded-xl">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-gray-400" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">No Addresses Found</h4>
                    <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">You haven't saved any service addresses yet. Add one now to make booking services faster.</p>
                    <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
                        <Plus className="w-4 h-4" /> Add Address
                    </button>
                </div>
            )}
        </div>
    );
}
