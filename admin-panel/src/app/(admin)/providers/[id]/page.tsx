"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
    ArrowLeft, Mail, Phone, Briefcase, MapPin, Star, Calendar,
    CheckCircle, XCircle, Loader2, Clock, FileText, Shield, User,
    IdCard, Building, Award, Languages, Globe, Image, BadgeCheck, AlertTriangle,
} from "lucide-react";

interface ProviderDetail {
    id: number;
    fullName: string;
    dob: string;
    email: string;
    mobileNumber: string;
    photograph: string;
    businessName: string;
    serviceCategory: string;
    serviceArea: string;
    experience: number;
    languages: string;
    fullAddress: string;
    state: string;
    city: string;
    pincode: string;
    govtId: string;
    gstin: string;
    qualification: string;
    policeVerification: string;
    bio: string;
    profilePicture: string;
    availability: string;
    agreeToS: boolean;
    agreeToBgCheck: boolean;
    isEmailVerified: boolean;
    isApproved: boolean;
    status: string;
    createdAt: string;
    rejectionReason: string;
}

export default function ProviderDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [provider, setProvider] = useState<ProviderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [rejectMode, setRejectMode] = useState(false);
    const [reason, setReason] = useState("");
    const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

    useEffect(() => {
        api.get(`/admin/providers/${id}`)
            .then(({ data }) => setProvider(data))
            .catch(() => toast.error("Failed to load provider"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleApprove = async () => {
        setActionLoading(true);
        try {
            await api.post(`/admin/providers/${id}/approve`);
            toast.success("Provider approved!");
            setProvider((prev) => prev ? { ...prev, status: "APPROVED" } : prev);
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!reason.trim()) { toast.error("Provide a reason"); return; }
        setActionLoading(true);
        try {
            await api.post(`/admin/providers/${id}/reject`, { reason });
            toast.success("Provider rejected");
            setProvider((prev) => prev ? { ...prev, status: "REJECTED", rejectionReason: reason } : prev);
            setRejectMode(false);
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center py-32"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>;
    }

    if (!provider) {
        return <div className="text-center py-20 text-gray-500">Provider not found</div>;
    }

    const statusColor: Record<string, string> = {
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        REJECTED: "bg-red-100 text-red-700 border-red-200",
    };

    const statusIcon: Record<string, any> = {
        PENDING: Clock,
        APPROVED: CheckCircle,
        REJECTED: XCircle,
    };

    const StatusIcon = statusIcon[provider.status] || Clock;

    return (
        <div>
            <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Providers
            </button>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-8">
                    <div className="flex items-center gap-5">
                        {provider.photograph || provider.profilePicture ? (
                            <img
                                src={provider.photograph || provider.profilePicture}
                                alt={provider.fullName}
                                onClick={() => setLightboxUrl(provider.photograph || provider.profilePicture)}
                                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white backdrop-blur-sm">
                                {provider.fullName?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div className="text-white flex-1">
                            <h1 className="text-2xl font-bold">{provider.fullName}</h1>
                            <p className="text-primary-100 text-sm">{provider.businessName || "Individual Provider"}</p>
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor[provider.status] || "bg-gray-100"}`}>
                                    <StatusIcon className="w-3 h-3" />
                                    {provider.status}
                                </span>
                                {provider.isEmailVerified && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                        <BadgeCheck className="w-3 h-3" /> Email Verified
                                    </span>
                                )}
                                {provider.createdAt && (
                                    <span className="text-primary-200 text-xs">
                                        Registered: {new Date(provider.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rejection Banner */}
                {provider.status === "REJECTED" && provider.rejectionReason && (
                    <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-700">Rejection Reason</p>
                                <p className="text-sm text-red-600 mt-0.5">{provider.rejectionReason}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Body */}
                <div className="p-8 space-y-8">

                    {/* Section: Personal Information */}
                    <Section title="Personal Information" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <InfoItem icon={User} label="Full Name" value={provider.fullName} />
                            <InfoItem icon={Mail} label="Email" value={provider.email} />
                            <InfoItem icon={Phone} label="Phone" value={provider.mobileNumber} />
                            <InfoItem icon={Calendar} label="Date of Birth" value={provider.dob ? new Date(provider.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : undefined} />
                            <InfoItem icon={Languages} label="Languages" value={provider.languages} />
                            <InfoItem icon={Globe} label="Availability" value={provider.availability} />
                        </div>
                    </Section>

                    {/* Section: Business Details */}
                    <Section title="Business Details" icon={Briefcase}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <InfoItem icon={Building} label="Business Name" value={provider.businessName} />
                            <InfoItem icon={Briefcase} label="Service Category" value={provider.serviceCategory} />
                            <InfoItem icon={Award} label="Experience" value={provider.experience ? `${provider.experience} years` : undefined} />
                            <InfoItem icon={IdCard} label="GSTIN" value={provider.gstin} />
                        </div>
                        {provider.bio && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Bio</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{provider.bio}</p>
                            </div>
                        )}
                    </Section>

                    {/* Section: Location */}
                    <Section title="Location & Service Areas" icon={MapPin}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <InfoItem icon={MapPin} label="Full Address" value={provider.fullAddress} />
                            <InfoItem icon={MapPin} label="City" value={provider.city} />
                            <InfoItem icon={MapPin} label="State" value={provider.state} />
                            <InfoItem icon={MapPin} label="Pincode" value={provider.pincode} />
                        </div>
                        {provider.serviceArea && (
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Service Area Pincodes</p>
                                <div className="flex flex-wrap gap-2">
                                    {provider.serviceArea.split(",").map((area, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold">{area.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>

                    {/* Section: Verification Documents — THE KEY SECTION */}
                    <Section title="Verification Documents" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <DocumentCard
                                label="Government ID"
                                description="Aadhaar / PAN / Voter ID / Driving License"
                                value={provider.govtId}
                                onView={() => provider.govtId && setLightboxUrl(provider.govtId)}
                            />
                            <DocumentCard
                                label="Police Verification Certificate"
                                description="Background check clearance document"
                                value={provider.policeVerification}
                                onView={() => provider.policeVerification && setLightboxUrl(provider.policeVerification)}
                            />
                            <DocumentCard
                                label="Qualification / Certification"
                                description="Professional trade or skill certificates"
                                value={provider.qualification}
                                onView={() => provider.qualification && setLightboxUrl(provider.qualification)}
                            />
                            <DocumentCard
                                label="Profile Photo"
                                description="Provider photograph for identity"
                                value={provider.photograph}
                                onView={() => provider.photograph && setLightboxUrl(provider.photograph)}
                            />
                        </div>
                    </Section>

                    {/* Section: Compliance Checkmarks */}
                    <Section title="Compliance & Agreements" icon={CheckCircle}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <CheckItem label="Email Verified" checked={!!provider.isEmailVerified} />
                            <CheckItem label="Agreed to Terms of Service" checked={provider.agreeToS} />
                            <CheckItem label="Agreed to Background Check" checked={provider.agreeToBgCheck} />
                        </div>
                    </Section>

                    {/* Actions */}
                    {provider.status === "PENDING" && (
                        <div className="pt-6 border-t border-gray-200">
                            {rejectMode ? (
                                <div className="space-y-3 max-w-lg">
                                    <p className="text-sm font-medium text-gray-700">Rejection Reason</p>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="e.g. Government ID is not clearly legible, please re-upload..."
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                                    />
                                    <div className="flex gap-3">
                                        <button onClick={() => setRejectMode(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                                        <button onClick={handleReject} disabled={actionLoading} className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">
                                            {actionLoading ? "Rejecting..." : "Confirm Rejection"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <button onClick={handleApprove} disabled={actionLoading} className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 shadow-sm">
                                        <CheckCircle className="w-4 h-4" /> Approve Provider
                                    </button>
                                    <button onClick={() => setRejectMode(true)} className="px-6 py-2.5 bg-red-50 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-100 flex items-center gap-2">
                                        <XCircle className="w-4 h-4" /> Reject Provider
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxUrl && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6" onClick={() => setLightboxUrl(null)}>
                    <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setLightboxUrl(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-medium">✕ Close</button>
                        <img src={lightboxUrl} alt="Document" className="w-full rounded-xl shadow-2xl object-contain max-h-[80vh]" />
                    </div>
                </div>
            )}
        </div>
    );
}

/* =============== Sub-Components =============== */

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 text-primary-500" />
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm text-gray-900 font-medium">{value || <span className="text-gray-300 italic">Not provided</span>}</p>
            </div>
        </div>
    );
}

function DocumentCard({ label, description, value, onView }: { label: string; description: string; value?: string | null; onView: () => void }) {
    const isUrl = value && (value.startsWith("http") || value.startsWith("/"));
    const isImage = isUrl && /\.(jpg|jpeg|png|gif|webp)/i.test(value!);

    return (
        <div className={`p-4 rounded-xl border ${value ? "bg-white border-gray-200" : "bg-gray-50 border-dashed border-gray-300"}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                </div>
                {value ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">UPLOADED</span>
                ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">MISSING</span>
                )}
            </div>

            {value && (
                <div className="mt-3">
                    {isImage ? (
                        <img
                            src={value}
                            alt={label}
                            onClick={onView}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                        />
                    ) : isUrl ? (
                        <button
                            onClick={onView}
                            className="flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium hover:bg-primary-100 transition-colors"
                        >
                            <FileText className="w-4 h-4" /> View Document
                        </button>
                    ) : (
                        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg font-mono">{value}</p>
                    )}
                </div>
            )}
        </div>
    );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${checked ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
            {checked ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            <span className={`text-sm font-medium ${checked ? "text-emerald-700" : "text-red-700"}`}>{label}</span>
        </div>
    );
}
