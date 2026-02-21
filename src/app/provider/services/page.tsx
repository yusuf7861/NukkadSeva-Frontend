"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus, Edit2, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { useAuth } from "@/context/AuthContext";

interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    durationMinutes: number;
    isActive: boolean;
}

export default function MyServicesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await api.get<Service[]>("/provider/services");
                setServices(data);
            } catch (err) {
                console.error("Failed to fetch provider services", err);
                setError("Failed to load your services. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchServices();
        }
    }, [user]);

    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Header */}
                {/* Header */}
                <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-900 pl-12 lg:pl-0">My Services</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/provider/create-service">
                            <button className="bg-primary-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                <span className="hidden md:inline">Create New Service</span>
                                <span className="md:hidden">New</span>
                            </button>
                        </Link>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-5xl mx-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    ) : services.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-gray-400">inventory_2</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Services Listed Yet</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Start earning by listing the services you offer. It takes just a few minutes setup your first service.
                            </p>
                            <Link href="/provider/create-service">
                                <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition">
                                    Create First Service
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-sm transition">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {service.isActive ? (
                                                    <><CheckCircle className="w-3 h-3" /> Active</>
                                                ) : (
                                                    <><XCircle className="w-3 h-3" /> Inactive</>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                            <span className="font-medium text-gray-700">₹{service.price}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {service.durationMinutes} mins</span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded textxs">{service.category}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-1">{service.description}</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                            <Edit2 className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
