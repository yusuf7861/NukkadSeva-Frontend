"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
    Clock, CheckCircle, XCircle, Users, Eye, Loader2, Search, ChevronDown,
} from "lucide-react";
import Link from "next/link";

interface Provider {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    businessName: string;
    serviceCategory: string;
    status: string;
    experience?: string;
    serviceArea?: string;
    averageRating?: number;
}

const tabs = [
    { key: "all", label: "All Providers", icon: Users },
    { key: "pending", label: "Pending", icon: Clock },
    { key: "approved", label: "Approved", icon: CheckCircle },
    { key: "rejected", label: "Rejected", icon: XCircle },
];

function ProvidersContent() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get("tab") || "all";
    const [activeTab, setActiveTab] = useState(initialTab);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [rejectId, setRejectId] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    const fetchProviders = async (tab: string) => {
        setLoading(true);
        try {
            let url = "/admin/all-providers";
            if (tab === "pending") url = "/admin/providers/pending";
            else if (tab === "approved") url = "/admin/providers/approved";
            else if (tab === "rejected") url = "/admin/providers/rejected";
            const { data } = await api.get(url);
            setProviders(data);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load providers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders(activeTab);
    }, [activeTab]);

    const handleApprove = async (id: number) => {
        setActionLoading(id);
        try {
            await api.post(`/admin/providers/${id}/approve`);
            toast.success("Provider approved!");
            fetchProviders(activeTab);
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to approve");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async () => {
        if (!rejectId || !rejectReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }
        setActionLoading(rejectId);
        try {
            await api.post(`/admin/providers/${rejectId}/reject`, { reason: rejectReason });
            toast.success("Provider rejected");
            setRejectId(null);
            setRejectReason("");
            fetchProviders(activeTab);
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to reject");
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = providers.filter(
        (p) =>
            p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            p.email?.toLowerCase().includes(search.toLowerCase()) ||
            p.businessName?.toLowerCase().includes(search.toLowerCase())
    );

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            PENDING: "bg-amber-100 text-amber-700",
            APPROVED: "bg-emerald-100 text-emerald-700",
            REJECTED: "bg-red-100 text-red-700",
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
                {status}
            </span>
        );
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Provider Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Review and manage service providers</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search providers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No providers found</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Provider</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Business</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">
                                                {p.fullName?.[0]?.toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{p.fullName}</p>
                                                <p className="text-xs text-gray-500">{p.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-700">{p.businessName || "—"}</td>
                                    <td className="px-5 py-4 text-sm text-gray-700">{p.serviceCategory || "—"}</td>
                                    <td className="px-5 py-4">{statusBadge(p.status)}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/providers/${p.id}`}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            {(p.status === "PENDING" || activeTab === "pending") && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(p.id)}
                                                        disabled={actionLoading === p.id}
                                                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === p.id ? "..." : "Approve"}
                                                    </button>
                                                    <button
                                                        onClick={() => setRejectId(p.id)}
                                                        disabled={actionLoading === p.id}
                                                        className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rejection Modal */}
            {rejectId !== null && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Reject Provider</h3>
                        <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejection. This will be emailed to the provider.</p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="e.g. Incomplete documentation, invalid credentials..."
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => { setRejectId(null); setRejectReason(""); }} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={actionLoading !== null}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {actionLoading ? "Rejecting..." : "Reject Provider"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProvidersPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>}>
            <ProvidersContent />
        </Suspense>
    );
}
