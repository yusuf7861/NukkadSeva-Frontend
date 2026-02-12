"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { MapPin } from "lucide-react";

export default function ProviderAreasPage() {
    return (
        <div className="flex bg-gray-50 font-sans text-gray-900 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 p-4 md:p-8">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-primary-50 p-4 rounded-full mb-4">
                        <MapPin className="w-12 h-12 text-primary-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Areas</h1>
                    <p className="text-gray-500 max-w-md">
                        Manage the locations where you offer your services. This feature is coming soon.
                    </p>
                </div>
            </main>
        </div>
    );
}
