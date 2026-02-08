"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/api";
import { CustomerProfile, CustomerProfileUpdateRequest } from "@/types/backend";
import { User as UserIcon, Mail, Phone, MapPin, Camera, Save } from "lucide-react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<CustomerProfile>({
        name: "",
        email: "",
        phone: "",
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get<CustomerProfile>("/customer/profile");
            setProfile(data);
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const updateData: CustomerProfileUpdateRequest = {
                name: profile.name,
                phone: profile.phone,
                fullAddress: profile.fullAddress,
                state: profile.state,
                city: profile.city,
                pincode: profile.pincode,
            };
            await api.put("/customer/profile", updateData);
            setIsEditing(false);
            // specific notification or toast could be added here
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile");
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-sm text-gray-500">Manage your personal info</p>
                    </div>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600">
                            Edit
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600 flex items-center">
                                <Save className="w-3 h-3 mr-1" />Save
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    {/* Avatar */}
                    <div className="flex items-center mb-6">
                        <div className="relative">
                            <img src={profile.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600">
                                    <Camera className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-semibold text-gray-900">{profile.name}</h2>
                            <p className="text-xs text-gray-500">{profile.email}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="email" value={profile.email} disabled className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={profile.fullAddress} onChange={(e) => setProfile({ ...profile, fullAddress: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                            <input type="text" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                            <input type="text" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                            <input type="text" value={profile.pincode} onChange={(e) => setProfile({ ...profile, pincode: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
