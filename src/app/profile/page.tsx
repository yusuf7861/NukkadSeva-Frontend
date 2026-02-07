"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: user?.name || "John Doe",
        email: user?.email || "john.doe@example.com",
        phone: "+91 9876543210",
        address: "123 Main Street",
        city: "New Delhi",
        pincode: "110001",
        avatar: user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
    });

    const handleSave = () => {
        setIsEditing(false);
        console.log("Saving profile:", profile);
    };

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
                            <img src={profile.avatar} alt={profile.fullName} className="w-16 h-16 rounded-full object-cover" />
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600">
                                    <Camera className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-semibold text-gray-900">{profile.fullName}</h2>
                            <p className="text-xs text-gray-500">Customer since Jan 2025</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
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
                                <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} disabled={!isEditing} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                            <input type="text" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500" />
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
