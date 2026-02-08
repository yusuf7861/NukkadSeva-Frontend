"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import api from "@/lib/api";
import { DashboardProviderDto } from "@/types/backend";
import { Search, MapPin, Filter, Star, Grid, List } from "lucide-react";

const categories = ["All", "Plumbing", "Electrical", "Painting", "Cleaning", "Carpentry", "AC Repair"];

export default function ProvidersPage() {
    const [providers, setProviders] = useState<DashboardProviderDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProviders();
    }, [selectedCategory]);

    const fetchProviders = async () => {
        setIsLoading(true);
        try {
            const params: any = {};
            if (selectedCategory !== "All") params.category = selectedCategory;

            const { data } = await api.get<{ providers: DashboardProviderDto[] }>("/public/providers", { params });
            setProviders(data.providers || []);
        } catch (error) {
            console.error("Failed to fetch providers", error);
            setProviders([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProviders = providers.filter((p) => {
        // Client-side search and filtering
        const matchesSearch = (p.businessName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.serviceCategory || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6">
                {/* Search Header */}
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex items-center px-3 py-2 border border-gray-300 rounded-lg">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-sm outline-none" />
                        </div>
                        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <input type="text" placeholder="Location" className="w-full sm:w-24 text-sm outline-none" />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            <Filter className="w-4 h-4 mr-1" />Filters
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar Filters */}
                    <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:w-48 flex-shrink-0`}>
                        <div className="bg-white rounded-lg p-3 shadow-sm sticky top-16">
                            <h3 className="text-xs font-semibold text-gray-900 mb-2">Categories</h3>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${selectedCategory === cat ? "bg-primary-50 text-primary-500 font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-xs font-semibold text-gray-900 mt-4 mb-2">Rating</h3>
                            <div className="space-y-1">
                                {[4, 3, 2].map((rating) => (
                                    <label key={rating} className="flex items-center text-xs text-gray-600">
                                        <input type="checkbox" className="mr-2 rounded" />
                                        {rating}+ <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-gray-600"><span className="font-medium text-gray-900">{filteredProviders.length}</span> providers</p>
                            <div className="flex items-center space-x-2">
                                <select className="px-2 py-1.5 border border-gray-300 rounded text-xs">
                                    <option>Recommended</option>
                                    <option>Rating</option>
                                    <option>Price: Low to High</option>
                                </select>
                                <div className="flex border border-gray-300 rounded overflow-hidden">
                                    <button onClick={() => setViewMode("grid")} className={`p-1.5 ${viewMode === "grid" ? "bg-primary-50 text-primary-500" : "text-gray-500"}`}>
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setViewMode("list")} className={`p-1.5 ${viewMode === "list" ? "bg-primary-50 text-primary-500" : "text-gray-500"}`}>
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-10">Loading...</div>
                        ) : (
                            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-3" : "space-y-3"}>
                                {filteredProviders.length > 0 ? (
                                    filteredProviders.map((provider) => (
                                        <Link key={provider.id} href={`/providers/${provider.id}`} className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${viewMode === "list" ? "flex items-center p-3" : "p-3"}`}>
                                            <div className={viewMode === "list" ? "flex items-center flex-1" : ""}>
                                                <img src={provider.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"} alt={provider.fullName} className={`rounded-full object-cover ${viewMode === "list" ? "w-12 h-12 mr-3" : "w-14 h-14 mx-auto mb-2"}`} />
                                                <div className={viewMode === "list" ? "flex-1" : "text-center"}>
                                                    <div className="flex items-center justify-center gap-1 mb-0.5">
                                                        <h3 className="text-sm font-semibold text-gray-900 truncate">{provider.businessName || provider.fullName}</h3>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-1">{provider.serviceCategory}</p>
                                                    <div className="flex items-center justify-center gap-1 mb-1">
                                                        <span className="text-xs text-gray-500">{provider.experience} Yrs Exp.</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500"><MapPin className="w-3 h-3 inline" />{provider.serviceArea}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10 text-gray-500">No providers found.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
