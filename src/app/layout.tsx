import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const interClassName = "font-sans";

export const metadata: Metadata = {
    title: "NukkadSeva - Local Service Finder",
    description: "Find trusted local service providers for all your home needs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={interClassName}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}

