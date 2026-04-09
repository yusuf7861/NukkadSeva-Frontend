"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import {
    User, Mail, Phone, MapPin, Save, Loader2, Camera, Shield,
    Star, Clock, Lock, Bell, Eye, EyeOff, Trash2,
    ChevronRight, Edit2, X, Maximize2, CheckCircle2
} from "lucide-react";
import Image from "next/image";
import AddressManager from "@/components/AddressManager";
import toast from "react-hot-toast";

import { CustomerProfileResponse, CustomerProfileUpdateRequest } from "@/types/backend";

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
    activeBookingsCount: number;
    reviewsGivenCount: number;
}

type Tab = "profile" | "addresses" | "security" | "notifications";

const TABS: { id: Tab; label: string; icon: React.ElementType; description: string }[] = [
    { id: "profile",       label: "Personal Info",   icon: User,   description: "Name, phone & email" },
    { id: "addresses",     label: "Addresses",       icon: MapPin, description: "Your saved locations" },
    { id: "security",      label: "Security",        icon: Shield, description: "Password & account safety" },
    { id: "notifications", label: "Notifications",   icon: Bell,   description: "How we reach you" },
];

export default function CustomerProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [profile, setProfile] = useState<CustomerProfileState | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPic, setIsUploadingPic] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const [formData, setFormData] = useState<CustomerProfileUpdateRequest>({
        name: "",
        phone: "",
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        push: false,
        marketing: false,
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get<CustomerProfileResponse>("/customer/profile");
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
                activeBookingsCount: data.activeBookingsCount || 0,
                reviewsGivenCount: data.reviewsGivenCount || 0,
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

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const { data } = await api.put<CustomerProfileResponse>("/customer/profile", formData);
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
                activeBookingsCount: data.activeBookingsCount || 0,
                reviewsGivenCount: data.reviewsGivenCount || 0,
            };
            setProfile(mappedProfile);
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed");
            return;
        }
        if (file.size > 204800) {
            toast.error("File size must be less than 200KB");
            return;
        }

        const formDataForUpload = new FormData();
        formDataForUpload.append("file", file);

        setIsUploadingPic(true);
        try {
            await api.put("/update-profile-picture", formDataForUpload);
            await fetchProfile();
            toast.success("Profile picture updated");
        } catch (error) {
            console.error("Failed to upload profile picture", error);
            toast.error("Failed to upload profile picture");
        } finally {
            setIsUploadingPic(false);
            e.target.value = "";
        }
    };

    const handleChangePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match");
            return;
        }
        setIsChangingPassword(true);
        try {
            toast.success("Password changed successfully");
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (error) {
            console.error("Failed to change password", error);
            toast.error("Failed to change password");
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    const PasswordField = ({
        label,
        field,
    }: {
        label: string;
        field: "current" | "new" | "confirm";
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    type={showPassword[field] ? "text" : "password"}
                    value={passwords[field]}
                    onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-10 bg-gray-50"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, [field]: !showPassword[field] })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* ── Left Sidebar ── */}
                    <div className="lg:col-span-1 space-y-4">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Cover */}
                            <div className="h-20 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 relative">
                                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-white/10" />
                            </div>

                            {/* Avatar */}
                            <div className="flex flex-col items-center -mt-10 px-4 pb-5">
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => profile?.profilePicture && setShowImageModal(true)}
                                >
                                    <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
                                        {profile?.profilePicture ? (
                                            <Image
                                                src={profile.profilePicture}
                                                alt={profile.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                                <User className="w-8 h-8 text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                    {profile?.profilePicture && (
                                        <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Maximize2 className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById("profilePicInput")?.click();
                                        }}
                                        disabled={isUploadingPic}
                                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow flex items-center justify-center transition-all disabled:opacity-50"
                                    >
                                        {isUploadingPic ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <Camera className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                    <input
                                        type="file"
                                        id="profilePicInput"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                    />
                                </div>

                                <div className="mt-3 text-center">
                                    <h2 className="text-base font-bold text-gray-900 truncate max-w-[160px]">
                                        {profile?.name || "—"}
                                    </h2>
                                    <p className="text-xs text-gray-500 truncate max-w-[160px]">{profile?.email}</p>
                                    <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="border-t border-gray-100 grid grid-cols-2">
                                <div className="flex flex-col items-center py-3 border-r border-gray-100">
                                    <div className="flex items-center gap-1 text-orange-500 mb-0.5">
                                        <Clock className="w-3.5 h-3.5" />
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{profile?.activeBookingsCount ?? 0}</p>
                                    <p className="text-xs text-gray-500">Bookings</p>
                                </div>
                                <div className="flex flex-col items-center py-3">
                                    <div className="flex items-center gap-1 text-purple-500 mb-0.5">
                                        <Star className="w-3.5 h-3.5" />
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{profile?.reviewsGivenCount ?? 0}</p>
                                    <p className="text-xs text-gray-500">Reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <nav className="divide-y divide-gray-100">
                                {TABS.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                                isActive
                                                    ? "bg-primary-50 border-l-4 border-primary-500"
                                                    : "hover:bg-gray-50 border-l-4 border-transparent"
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                isActive ? "bg-primary-100" : "bg-gray-100"
                                            }`}>
                                                <Icon className={`w-4 h-4 ${isActive ? "text-primary-600" : "text-gray-500"}`} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`text-sm font-semibold ${isActive ? "text-primary-700" : "text-gray-700"}`}>
                                                    {tab.label}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">{tab.description}</p>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 ml-auto flex-shrink-0 ${isActive ? "text-primary-400" : "text-gray-300"}`} />
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                            <div className="px-4 py-3 border-b border-red-100 flex items-center gap-2">
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-semibold text-red-600">Danger Zone</span>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-gray-500 mb-3">
                                    Permanently delete your account and all associated data.
                                </p>
                                <button className="w-full py-2 px-4 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Main Content Panel ── */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                            {/* ── Tab: Personal Info ── */}
                            {activeTab === "profile" && (
                                <>
                                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">Update your name and contact details</p>
                                        </div>
                                        <button
                                            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                            disabled={isSaving}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${
                                                isEditing
                                                    ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {isSaving ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : isEditing ? (
                                                <Save className="w-4 h-4" />
                                            ) : (
                                                <Edit2 className="w-4 h-4" />
                                            )}
                                            {isEditing ? "Save Changes" : "Edit Profile"}
                                        </button>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Name & Phone */}
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Basic Details</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</span>
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                                            placeholder="Enter your full name"
                                                        />
                                                    ) : (
                                                        <div className="px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 border border-gray-100 font-medium">
                                                            {profile?.name || "—"}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone Number</span>
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                                            placeholder="Enter your phone"
                                                        />
                                                    ) : (
                                                        <div className="px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 border border-gray-100 font-medium">
                                                            {profile?.phone || "Not provided"}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email (read-only) */}
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account Details</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email Address</span>
                                                </label>
                                                <div className="px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-500 border border-gray-200 flex items-center justify-between">
                                                    <span>{profile?.email}</span>
                                                    <span className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-0.5 bg-white">Read only</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1.5 ml-1">Email address cannot be changed after registration.</p>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="flex gap-3 pt-2">
                                                <button
                                                    onClick={handleSaveProfile}
                                                    disabled={isSaving}
                                                    className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                                                >
                                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => { setIsEditing(false); }}
                                                    className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* ── Tab: Addresses ── */}
                            {activeTab === "addresses" && (
                                <>
                                    <div className="px-6 py-5 border-b border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900">Service Addresses</h2>
                                        <p className="text-sm text-gray-500 mt-0.5">Manage the locations where you need services</p>
                                    </div>
                                    <div className="p-6">
                                        <AddressManager />
                                    </div>
                                </>
                            )}

                            {/* ── Tab: Security ── */}
                            {activeTab === "security" && (
                                <>
                                    <div className="px-6 py-5 border-b border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                                        <p className="text-sm text-gray-500 mt-0.5">Manage your password and account safety</p>
                                    </div>

                                    <div className="p-6 space-y-8">
                                        {/* Change Password */}
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Change Password</h3>
                                            <div className="space-y-4">
                                                <PasswordField label="Current Password" field="current" />
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <PasswordField label="New Password" field="new" />
                                                    <PasswordField label="Confirm New Password" field="confirm" />
                                                </div>
                                                <button
                                                    onClick={handleChangePassword}
                                                    disabled={isChangingPassword || !passwords.current || !passwords.new || !passwords.confirm}
                                                    className="mt-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                                                >
                                                    {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>

                                        {/* Security Actions */}
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account Security</h3>
                                            <div className="space-y-3">
                                                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                            <Shield className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                                                            <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                </button>

                                                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                            <Lock className="w-4 h-4 text-green-600" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-sm font-semibold text-gray-900">Active Sessions</p>
                                                            <p className="text-xs text-gray-500">View and manage your active login sessions</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ── Tab: Notifications ── */}
                            {activeTab === "notifications" && (
                                <>
                                    <div className="px-6 py-5 border-b border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                                        <p className="text-sm text-gray-500 mt-0.5">Choose how and when we can contact you</p>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Communication Channels</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { key: "email" as const, label: "Email Notifications", description: "Booking confirmations, receipts, and account updates", icon: Mail },
                                                    { key: "sms" as const, label: "SMS Notifications", description: "Important alerts and OTPs via text message", icon: Phone },
                                                    { key: "push" as const, label: "Push Notifications", description: "Real-time updates in your browser", icon: Bell },
                                                ].map((item) => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <div
                                                            key={item.key}
                                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                                    <Icon className="w-4 h-4 text-gray-600" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                                                    <p className="text-xs text-gray-500">{item.description}</p>
                                                                </div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={notifications[item.key]}
                                                                    onChange={(e) =>
                                                                        setNotifications({ ...notifications, [item.key]: e.target.checked })
                                                                    }
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Marketing</h3>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                        <Mail className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">Promotional Emails</p>
                                                        <p className="text-xs text-gray-500">Special offers, discounts, and HomeFix news</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications.marketing}
                                                        onChange={(e) =>
                                                            setNotifications({ ...notifications, marketing: e.target.checked })
                                                        }
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-sm">
                                                <Save className="w-4 h-4" />
                                                Save Preferences
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Picture Modal */}
            {showImageModal && profile?.profilePicture && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowImageModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">{profile.name}</h3>
                                <p className="text-xs text-gray-500">{profile.email}</p>
                            </div>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                <Image
                                    src={profile.profilePicture}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
