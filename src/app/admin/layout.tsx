"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-900">
            <AdminSidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
