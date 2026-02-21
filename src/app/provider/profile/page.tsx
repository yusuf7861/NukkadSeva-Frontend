"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import {
    User, Mail, Phone, MapPin, Briefcase, Calendar,
    FileText, CheckCircle, XCircle, Clock, ShieldCheck
} from "lucide-react";
import Image from "next/image";

interface ProviderProfile {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    dob: string;
    profilePicture: string;
    bio: string;

    // Professional
    businessName: string;
    serviceCategory: string;
    serviceArea: string;
    experience: number;
    languages: string;
    availability: string;

    // Address
    fullAddress: string;
    city: string;
    state: string;
    pincode: string;

    // Status
    status: string;
    isEmailVerified: boolean;
    isApproved: boolean;
    rejectionReason?: string;

    // Docs
    govtId: string;
    qualification: string;
    policeVerification: string;
    gstin: string;
}

export default function ProviderProfilePage() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<ProviderProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get<ProviderProfile>("/provider/profile");
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch provider profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Failed to load profile.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const StatusBadge = ({ status, isApproved }: { status: string, isApproved: boolean }) => {
        if (isApproved) {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Approved
                </span>
            );
        }
        if (status === "REJECTED") {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle className="w-3 h-3 mr-1" />
                    Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Clock className="w-3 h-3 mr-1" />
                Pending Verification
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
                    <button
                        onClick={logout}
                        className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

                {/* Status Card (if not approved/rejected) */}
                {(!profile.isApproved || profile.status === 'REJECTED') && (
                    <div className={`p-4 rounded-xl border ${profile.status === 'REJECTED' ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'}`}>
                        <div className="flex gap-3">
                            <div className="mt-0.5">
                                {profile.status === 'REJECTED' ? (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                ) : (
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                )}
                            </div>
                            <div>
                                <h3 className={`font-semibold ${profile.status === 'REJECTED' ? 'text-red-900' : 'text-yellow-900'}`}>
                                    Application Status: {profile.status}
                                </h3>
                                <p className={`text-sm mt-1 ${profile.status === 'REJECTED' ? 'text-red-700' : 'text-yellow-700'}`}>
                                    {profile.status === 'REJECTED'
                                        ? `Reason: ${profile.rejectionReason || "Documents verification failed."}`
                                        : "Your application is currently under review. Using the platform is limited until approval."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800 relative"></div>
                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6 gap-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white overflow-hidden relative">
                                    {profile.profilePicture ? (
                                        <Image
                                            src={profile.profilePicture}
                                            alt={profile.fullName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <User className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                                        <p className="text-gray-500 font-medium">{profile.businessName || "Independent Provider"}</p>
                                    </div>
                                    <StatusBadge status={profile.status} isApproved={profile.isApproved} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <User className="w-4 h-4" /> Personal Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{profile.email}</span>
                                        {profile.isEmailVerified && <CheckCircle className="w-3 h-3 text-green-500" title="Verified" />}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{profile.mobileNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">DOB: {profile.dob}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <span className="text-gray-600">
                                            {profile.fullAddress}, {profile.city}, {profile.state} - {profile.pincode}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Professional Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-500">Category</span>
                                        <span className="text-sm font-semibold text-gray-900">{profile.serviceCategory}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-500">Experience</span>
                                        <span className="text-sm font-semibold text-gray-900">{profile.experience} Years</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-500">Service Area</span>
                                        <span className="text-sm font-semibold text-gray-900">{profile.serviceArea}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bio */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">About Me</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {profile.bio || "No bio provided."}
                        </p>
                    </div>

                    {/* Languages & Availability */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Work Preferences</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Languages Spoken</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.languages.split(',').map((lang, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                                            {lang.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Availability</p>
                                <p className="text-sm font-medium text-gray-900">{profile.availability}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Documents & Verification
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { label: "Government ID", value: profile.govtId },
                            { label: "Qualification Cert", value: profile.qualification },
                            { label: "Police Verification", value: profile.policeVerification }
                        ].map((doc, idx) => (
                            <div key={idx} className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                                <div className="aspect-[4/3] bg-gray-100 relative items-center justify-center flex">
                                    {doc.value ? (
                                        <Image
                                            src={doc.value}
                                            alt={doc.label}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <FileText className="w-8 h-8 text-gray-300" />
                                    )}
                                </div>
                                <div className="p-3 bg-white border-t border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">{doc.label}</p>
                                    {doc.value ? (
                                        <a
                                            href={doc.value}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-primary-600 hover:underline mt-1 inline-block"
                                        >
                                            View Original
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-400 mt-1 inline-block">Not Uploaded</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {profile.gstin && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">GSTIN:</span> {profile.gstin}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
