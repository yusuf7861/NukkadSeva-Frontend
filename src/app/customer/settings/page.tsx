"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the unified profile page which now contains all settings
        router.replace("/customer/profile");
    }, [router]);

    return null;
}
