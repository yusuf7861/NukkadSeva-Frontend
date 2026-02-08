"use client";

import { useState } from "react";
import ServicesHeader from "@/components/admin/services/ServicesHeader";
import ServicesStats from "@/components/admin/services/ServicesStats";
import ServicesControlBar from "@/components/admin/services/ServicesControlBar";
import ServicesTable from "@/components/admin/services/ServicesTable";
import ServicesPagination from "@/components/admin/services/ServicesPagination";

export default function AdminServicesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
            <ServicesHeader />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <ServicesStats />
                <ServicesControlBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <ServicesTable />
                <ServicesPagination />
            </div>
        </div>
    );
}

