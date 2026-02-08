"use client";

import ProviderSidebar from "@/components/provider/ProviderSidebar";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProviderProfilePage() {
    const { user } = useAuth();

    return (
        <div className="flex bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen">
            <ProviderSidebar />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-500">
                                    <User className="w-10 h-10" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name || user?.username || "Provider"}</h1>
                            <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Verified Provider</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h2 className="text-lg font-bold mb-4">Profile Details</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            Profile management features including bio, skills, and portfolio uploads will be available here.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
