"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Loader2, Camera, Shield, Star, Clock } from "lucide-react";
import Image from "next/image";
import AddressManager from "@/components/AddressManager";

import { CustomerProfileResponse, CustomerProfileUpdateRequest } from "@/types/backend";

// ... imports remain the same

// Internal state interface (matches UI fields)
interface CustomerProfileState {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    profilePicture: string;
}

export default function CustomerProfilePage() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<CustomerProfileState | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState<CustomerProfileUpdateRequest>({
        name: "",
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
            const { data } = await api.get<CustomerProfileResponse>("/customer/profile");

            // Map backend response to UI state
            const mappedProfile: CustomerProfileState = {
                id: data.id,
                name: data.fullName,
                email: data.email,
                phone: data.mobileNumber,
                address: data.address?.fullAddress || "",
                city: data.address?.city || "",
                state: data.address?.state || "",
                pincode: data.address?.pincode || "",
                profilePicture: data.photograph || "",
            };

            setProfile(mappedProfile);
            setFormData({
                name: data.fullName || "",
                phone: data.mobileNumber || "",
                fullAddress: data.address?.fullAddress || "",
                city: data.address?.city || "",
                state: data.address?.state || "",
                pincode: data.address?.pincode || "",
            });
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // PUT request uses flattened structure
            const { data } = await api.put<CustomerProfileResponse>("/customer/profile", formData);

            // Map updated response back to UI state
            const mappedProfile: CustomerProfileState = {
                id: data.id,
                name: data.fullName,
                email: data.email,
                phone: data.mobileNumber,
                address: data.address?.fullAddress || "",
                city: data.address?.city || "",
                state: data.address?.state || "",
                pincode: data.address?.pincode || "",
                profilePicture: data.photograph || "",
            };

            setProfile(mappedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / Profile Card */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-primary-500 to-primary-600 relative">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                                        {profile?.profilePicture ? (
                                            <Image
                                                src={profile.profilePicture}
                                                alt={profile.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                <User className="w-10 h-10" />
                                            </div>
                                        )}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-primary-500 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-6 px-6 text-center">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{profile?.name || "User"}</h2>
                            <p className="text-sm text-gray-500 mb-4">{profile?.email}</p>

                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> Verified Customer
                                </span>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isEditing
                                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                                    }`}
                            >
                                {isEditing ? (
                                    <>
                                        <X className="w-4 h-4" /> Cancel Editing
                                    </>
                                ) : (
                                    <>
                                        <Edit2 className="w-4 h-4" /> Edit Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Active Bookings</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">2</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Star className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Reviews Given</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full md:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                                <p className="text-sm text-gray-500">Manage your personal details and address</p>
                            </div>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Changes
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-900">{profile?.name}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                                                placeholder="Enter your phone"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-900">{profile?.phone || "Not provided"}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                                    <div className="relative opacity-60">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={profile?.email || ""}
                                            readOnly
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm cursor-not-allowed text-gray-500"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Email cannot be changed
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <AddressManager />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
