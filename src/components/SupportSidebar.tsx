"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, Scale, Shield, Ticket, MessageSquare } from "lucide-react";

export default function SupportSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Help Center", path: "/support", icon: HelpCircle },
        { name: "Dispute Resolution", path: "/support/disputes", icon: Scale },
        { name: "Legal & Privacy", path: "/legal/terms", icon: Shield },
        { name: "My Tickets", path: "/support/tickets", icon: Ticket },
        { name: "Contact Support", path: "/support/contact", icon: MessageSquare },
    ];

    return (
        <aside className="w-full md:w-64 shrink-0 pr-4 md:pr-8 mb-8 md:mb-0">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary-900">Support Desk</h2>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Local Service Marketplace</p>
            </div>
            
            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || pathname?.startsWith(item.path);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                isActive
                                    ? "bg-primary-50 text-primary-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-primary-600" : "text-gray-400"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
