"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { Calendar } from "lucide-react";

export default function ProviderSchedulePage() {
    return (
        <div className="flex bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 p-4 md:p-8">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-primary-50 p-4 rounded-full mb-4">
                        <Calendar className="w-12 h-12 text-primary-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Schedule</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">
                        Your upcoming jobs and availability calendar will appear here. This feature is coming soon.
                    </p>
                </div>
            </main>
        </div>
    );
}
